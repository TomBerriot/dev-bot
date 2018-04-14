require('dotenv').config()

var http = require('http');
const Discord = require('discord.js');
const bot = new Discord.Client();
var logger = require('winston');
var request = require('request');
var logger = require('./Services/Logger').getInstance().getLogger();

const DevMemesFactory = require('./SourceManager/DevMemesFactory').DevMemesFactory;

var PREFIX = '?';

http.createServer(function (request, response) {
    response.statusCode = 200;
    response.end();
}).listen(process.env.PORT || 5000);

bot.on('ready', function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
    bot.user.setActivity("Type " + PREFIX + "help")
});

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
                        PREFIX = args[1];
                        bot.user.setActivity("Type " + PREFIX + "help");
                        message.channel.send('The Command Prefix has been changed to : **' + PREFIX + '**');
                    }
                    break;
                case 'd':
                case 'devMemes':

                    DevMemesFactory.getRandomMeme()
                        .then(meme=>{
                            message.channel.send(
                                '```asciidoc'+
                                '\n# ' + meme.title +
                                '```',
                                {files: [meme.imgSource]}
                            );
                    });
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
                        '\n' +
                        '\n# GitHub :' +
                        '\n   - Feel free to collaborate on the developpement of the bot : https://github.com/Cleverdawn/pedo-dev-bot.git '+
                        '```'
                    );
                    break;
            }
        }
    }catch(error){
        logger.error(error);
    }
});

try{
    bot.login(process.env.DISCORD_TOKEN)
}
catch(error){
    logger.error(error)
}
