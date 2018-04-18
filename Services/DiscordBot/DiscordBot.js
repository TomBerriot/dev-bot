const Discord = require('discord.js');
const bot = new Discord.Client();
const DevMemesFactory = require('../../SourceManager/DevMemesFactory').DevMemesFactory;
const AnimeFactory = require('../../SourceManager/AnimeFactory').AnimeFactory;

let ServiceManager = null;

let discordBotConfig = null;

let User = null;

function ready(){
    let logger = ServiceManager.getLogger();
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
    bot.user.setActivity("Type " + discordBotConfig.prefix + "help")
}

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

function devMemesCommand(message){
    let logger = ServiceManager.getLogger();

    DevMemesFactory.getRandomMeme()
        .then(meme=>{
            message.channel.send(
                '```asciidoc'+
                '\n# ' + meme.title +
                '```',
                {files: [meme.imgSource]}
            )
            .catch(error=>{
                logger.error(error + " " + meme.title + " " + meme.imgSource+ " error code : " + error.code);
                if(error.code === 40005) {
                    message.channel.send("Image file of this meme was too large lol. Loading new dank meme. :incoming_envelope:");
                }else{
                    message.channel.send("Meme too old, can't open dead link. Loading new dank meme. :incoming_envelope:");
                }
                devMemesCommand(message);
            });
        })
        .catch(error=>{
            logger.error("Dev Memes Command : " + error );
        });
}

function setPrefixCommand(message){
    let args = message.content.substring(discordBotConfig.prefix.length).split(' ');

    if((message.member.id === message.member.guild.ownerID)
        || message.author.tag === "Onodera#3602"){
        if(args[1] === undefined) message.reply('You must provide a value for this command');
        else if(isASCII(args[1])){
            discordBotConfig.prefix = args[1];
            bot.user.setActivity("Type " + discordBotConfig.prefix + "help");
            message.channel.send('The Command Prefix has been changed to : **' + discordBotConfig.prefix + '**');
        }else{
            message.channel.send('The prefix has to be **ASCII**.');
        }
    }else message.reply('You must be the owner of the guild to use this role');

}

function helpCommand(message){
    message.channel.send(
        '```Markdown' +
        '\n# Actual Prefix : ' + discordBotConfig.prefix+
        '\n' +
        '\n# Commands : ' +
        '\n   - ping : Pong !' +
        '\n   - setPrefix [value] : Change the prefix used before commands (reserved to guild owner)' +
        '\n   - devMemes (shortcut : d) : random dev memes across the web ' +
        '\n   - rps : Rock, Paper, Scissors ! ' +
        '\n   - help'+
        '\n' +
        '\n# GitHub :' +
        '\n   - Feel free to collaborate on the developpement of the bot : https://github.com/Cleverdawn/pedo-dev-bot.git '+
        '```'
    );
}

function opCommand(message){
    let args = message.content.substring(discordBotConfig.prefix.length).split(' ');
    AnimeFactory.getRandomOp(args[1]);
}

function rpsCommand(message){
    let i = Math.floor((Math.random() * 3) + 1);
    let emote = "";
    switch(i){
        case 1:
            emote = ":newspaper:";
            break;
        case 2:
            emote = ":scissors:";
            break;
        case 3:
            emote = ":full_moon:";
            break;
    }
    message.reply(emote);
}

function message(message){
    let logger = ServiceManager.getLogger();
    try{
        if (message.content.substring(0, discordBotConfig.prefix.length) === discordBotConfig.prefix) {
            let args = message.content.substring(discordBotConfig.prefix.length).split(' ');
            let cmd = args[0];
            switch(cmd) {
                case 'setPrefix':
                    setPrefixCommand(message);
                    break;
                case 'd':
                case 'devMemes':
                    User.findOrCreate(false, {where:{username:message.author.tag}})
                        .then(user=>{
                            user = user[0];
                            if(((user.memeCounter + 1) % 10) === 0){
                                message.reply("Stop lazing around, go work you lil' cunt. :japanese_goblin: ");
                            }

                            user.update({ memeCounter: user.memeCounter + 1 });
                        });
                    devMemesCommand(message);
                    break;
                case 'rps':
                    rpsCommand(message);
                    break;
                case 'op':
                    opCommand(message);
                    break;
                case 'help':
                    helpCommand(message);
                    break;
                case 'ping':
                    message.reply('Pong!');
                    break;
                case 'lolis':
                    message.channel.send("THEY ARE THE BEST");
                    break;
            }
        }
    }catch(error){
        logger.error("Bot On Message error " + error);
    }
}

module.exports.DiscordBot = {

    setup: function setup(serviceManager) {
        ServiceManager = serviceManager;
        let Manager = ServiceManager.getManagementManager();
        User = Manager.get('User');


        discordBotConfig = ServiceManager.getConfig().discordBot;

        bot.on('ready', ready);
        bot.on('message', message);

        return bot.login(discordBotConfig.token);
    }
};
