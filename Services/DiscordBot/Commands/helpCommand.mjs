import DiscordBot from '../DiscordBot';
import ServiceManager from '../../../ServiceManager';
import Command from './abs/Command';

class HelpCommand extends Command {
	constructor () {
		super();
		this.name= 'help';
		this.aliases= ['h'];
		this.usage= '[command name]';
		this.description= 'Get explanations on the commands of the bot and the state of the server';
	}

	async execute(message, args){
		message.channel.send(
			`${'```Markdown' +
			'\n# Actual Prefix : '}${ DiscordBot.getPrefix() }\n` +
			'\n# Commands : ' +
			'\n   - ping : Pong !' +
			'\n   - setPrefix < value > : Change the prefix used before commands (reserved to guild owner)' +
			'\n   - devMemes (shortcut : d) : random dev memes across the web ' +
			'\n   - jgirl (shortcut : jg) : Send random beautiful japanese girls <3 ' +
			'\n   - op|ed|oped < kitsu|mal > < username > [ number of videos ] : Get the opening or ending of a random anime of your completed anime library ! (Supports Kitsu ' +
			'and MyAnimeList accounts).\n		Get a playlist by adding the number of songs you want !' +
			'\n   - rps : Rock, Paper, Scissors ! ' +
			'\n   - help' +
			'\n' +
			'\n# GitHub :' +
			'\n   - Feel free to collaborate on the developpement of the bot : https://github.com/Cleverdawn/pedo-dev-bot.git ' +
			'```'
		);
	}
}

export default new HelpCommand();