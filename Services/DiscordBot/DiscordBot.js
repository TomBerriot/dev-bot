const Discord = require('discord.js');
const fs = require('fs');
const appRootDir = require('app-root-dir').get();

let ServiceManager = null;

let discordBotConfig = null;

let bot = null;

function ready() {
	const logger = ServiceManager.getLogger();
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(`${bot.user.username } - (${ bot.user.id })`);
	bot.user.setActivity(`Type ${ discordBotConfig.prefix }help`);
}


function message(message) {
	const logger = ServiceManager.getLogger();
	try{
		if (message.content.substring(0, discordBotConfig.prefix.length) === discordBotConfig.prefix) {
			const args = message.content.substring(discordBotConfig.prefix.length).split(/ +/);

			logger.info(`${message.content } : author : ${ message.author.tag } ; server : ${ message.guild ? message.guild.name : 'no guild '}`);
			const commandName = args[0];

			const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.length > 0 && cmd.aliases.includes(commandName));

			if (!command) return;

			if(command.guildOnly && message.channel.type !== 'text') {
				return message.channel.send('This command is reserved to guilds.');
			}
			else if(command.ownerGuildOnly && ((message.member.id !== message.member.guild.ownerID) || message.author.tag !== 'Onodera#3602')) {
				return message.reply('You must be the owner of the guild to use this role');
			}

			if (command.args && args.length === 0) {
				let reply = 'You didn\'t provide any arguments.';
				if(command.usage) {
					reply += `\nThe usage would be : ${discordBotConfig.prefix}${commandName} ${command.usage}`;
				}
				return message.channel.send(reply);
			}

			command.execute(message, args);

		}
	}
	catch(error) {
		logger.error(`Bot On Message error ${ error}`);
	}
}

function messageReactionAdd(reaction, user) {
	const logger = ServiceManager.getLogger();
	try{
		if(user.id !== bot.user.id) {

			logger.info(`reaction : ${reaction._emoji.name} ; author : ${ user.tag } ; server : ${ reaction.message.guild ? reaction.message.guild.name : 'no guild '}`);

			const command = bot.reactionsHandlers.get(reaction.message.nonce);

			if (!command) return;
			command.reactionHandler(reaction, user);
		}
	}
	catch(error) {
		logger.error(`Bot On messageReactionAdd error ${ error}`);
	}
}

module.exports.DiscordBot = {

	setup: function setup(serviceManager) {
		ServiceManager = serviceManager;

		bot = new Discord.Client();
		bot.commands = new Discord.Collection();
		bot.reactionsHandlers = new Discord.Collection();

		discordBotConfig = ServiceManager.getConfig().discordBot;

		const commandFiles = fs.readdirSync(`${appRootDir }/Services/DiscordBot/Commands`);

		for (const file of commandFiles) {
			const command = require(`./Commands/${file}`);
			bot.commands.set(command.name, command);
			if(command.nonce) bot.reactionsHandlers.set(command.nonce, command);

		}
		bot.on('ready', ready);
		bot.on('message', message);
		bot.on('messageReactionAdd', messageReactionAdd);

		return bot.login(discordBotConfig.token);
	},
	getClient: () => bot,
	setPrefix: (prefix) => discordBotConfig.prefix = prefix,
	getPrefix: () => discordBotConfig.prefix,

};
