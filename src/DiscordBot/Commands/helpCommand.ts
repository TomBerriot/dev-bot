import DiscordBot from 'src/DiscordBot';
import Command from './abs/Command';

class HelpCommand extends Command {
	constructor () {
		super();
		this.name= 'help';
		this.aliases= ['h'];
		this.usage= '[command name]';
		this.description= 'Get explanations on the commands of the bot and the state of the server';
	}

	public async execute(message, args): Promise<any>{
		return message.channel.send(
			`${'```Markdown' +
			'\n# Actual Prefix: '}${ DiscordBot.getPrefix() }\n` +
			'\n# Commands: ' +
			'\n   - devMemes (shortcut : d) : random dev memes across the web ' +
			'\n   - help' +
			'\n' +
			'\n# GitHub:' +
			'\n   - Feel free to collaborate on the developpement of the bot : https://github.com/TomBerriot/dev-bot.git ' +
			'```'
		);
	}
}

export default new HelpCommand();