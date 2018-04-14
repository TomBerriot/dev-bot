require('dotenv').config()

const Discord = require('discord.js')
const tumblr = require('tumblr.js')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const bot = new Discord.Client()
var logger = require('winston');

var PREFIX = '??'

try {
    var tumblrClient = new tumblr.createClient({
        consumer_key: process.env.TUMBLR_API_KEY,
        consumer_secret: process.env.TUMBLR_SECRET_KEY,
        token: process.env.TUMBLR_TOKEN,
        token_secret: process.env.TUMBLR_TOKEN_SECRET,
        returnPromises: true,
    });
}
catch(error){
        logger.error(error)
}


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';


bot.on('ready', function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
    bot.user.setActivity("Type " + PREFIX + "help")
})

bot.on('message', async message => {
    try{
        if (message.content.substring(0, PREFIX.length) === PREFIX) {
            var args = message.content.substring(PREFIX.length).split(' ');
            var cmd = args[0];
            switch(cmd) {
                case 'ping':
                    message.reply('Pong!');
                    break;
                case 'setPrefix':
                    if(args[1] === undefined) message.channel.send('You must provide a value for this command')
                    else {
                        PREFIX = args[1]
                        bot.user.setActivity("Type " + PREFIX + "help")
                        message.channel.send('The Command Prefix has been changed to : **' + PREFIX + '**')
                    }
                    break;
                case 'd':
                case 'devMemes':
                    tumblrClient.blogInfo('thecodinglove.com')
                        .then(data=>{
                            var offset = Math.floor(Math.random() * data.blog.total_posts)
                            return tumblrClient.blogPosts('thecodinglove.com', {offset: offset, limit: 1})
                        })
                        .then(data=>{
                            var post = data.posts[0]
                            const dom = new JSDOM(post.body)
                            message.channel.send(
                                '```asciidoc'+
                                '\n# ' + post.summary+
                                '```\n'+
                                dom.window.document.querySelector('img').src
                            )
                        })

                    break;
                case 'lolis':
                    message.channel.send("THEY ARE THE BEST")
                    break;
                case 'help':
                    message.channel.send(
                        '```Markdown' +
                        '\n# Actual Prefix : ' + PREFIX+
                        '\n' +
                        '\n# Commands : ' +
                        '\n   - ping : Pong !' +
                        '\n   - setPrefix [value] : Change the prefix used before commands' +
                        '\n   - devMemes (shortcut : d) : random dev memes across the web ' +
                        '\n   - help'+
                        '```'
                    )
                    break;

            }
        }
    }catch(error){
        logger.error(error)
    }

});


try{
    bot.login(process.env.DISCORD_TOKEN)
}
catch(error){
    logger.error(error)
}