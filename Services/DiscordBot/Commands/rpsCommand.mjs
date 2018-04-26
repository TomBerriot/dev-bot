import ServiceManager from '../../../ServiceManager';
import Command from './abs/Command';

class RpsCommand extends Command {
	constructor () {
		super();
		this.name= 'rps';
		this.description= 'Rock :full_moon: , Paper :newspaper: ,  Scissors :scissors: !';
	}

	async execute(message, args){
		let emote = '';
		switch(Math.floor((Math.random() * 3) + 1)) {
			case 1:
				emote = ':newspaper:';
				break;
			case 2:
				emote = ':scissors:';
				break;
			case 3:
				emote = ':full_moon:';
				break;
		}
		message.reply(emote);
	}
}

export default new RpsCommand();
