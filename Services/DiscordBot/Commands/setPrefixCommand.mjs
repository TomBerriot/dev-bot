import ServiceManager from '../../../ServiceManager';
import DiscordBot from '../DiscordBot';
import Command from './abs/Command';

class SetPrefixCommand extends Command {
	constructor () {
		super();
		this.name= 'setPrefix';
		this.args = true;
		this.usage = '<prefix character>';
		this.guildOnly = true;
		this.ownerGuildOnly = true;
		this.protected = true;
		this.description= 'Change the prefix of the commands of the bot to another character(s)';
	}

	async execute(message, args){
		const bot = DiscordBot.getClient();
		if(args[1] === undefined) {
			message.reply('You must provide a value for this command');
		}
		else if(this.isASCII(args[1])) {
			DiscordBot.setPrefix(args[1]);
			bot.user.setActivity(`Type ${ DiscordBot.getPrefix() }help`);
			message.channel.send(`The Command Prefix has been changed to : **${ DiscordBot.getPrefix() }**`);
		}
		else{
			message.channel.send('The prefix has to be **ASCII**.');
		}
	}

	isASCII(str) {
		return /^[\x00-\x7F]*$/.test(str);
	}
}

export default new SetPrefixCommand();
