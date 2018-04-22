const ServiceManager = require('../../../ServiceManager');
const DiscordBot = require('../DiscordBot').DiscordBot;

function isASCII(str) {
	return /^[\x00-\x7F]*$/.test(str);
}

module.exports = {
	name: 'setPrefix',
	args: false,
	aliases: [],
	usage: '<prefix character>',
	guildOnly: true,
	ownerGuildOnly:true,
	description: 'Change the prefix of the commands of the bot to another character(s)',
	async execute(message, args) {
		const bot = DiscordBot.getClient();
		if(args[1] === undefined) {
			message.reply('You must provide a value for this command');
		}
		else if(isASCII(args[1])) {
			DiscordBot.setPrefix(args[1]);
			bot.user.setActivity(`Type ${ DiscordBot.getPrefix() }help`);
			message.channel.send(`The Command Prefix has been changed to : **${ DiscordBot.getPrefix() }**`);
		}
		else{
			message.channel.send('The prefix has to be **ASCII**.');
		}
	},
};
