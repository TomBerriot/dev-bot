import AnimeFactory from '../../../SourceManager/AnimeFactory';
import YoutubeApi from '../../../SourceManager/YoutubeApi';
import ServiceManager from '../../../ServiceManager';
import Command from './abs/Command';

class OpEdCommand extends Command {
	constructor () {
		super();
		this.name= 'oped';
		this.args = true;
		this.aliases= ['op', 'ed'];
		this.usage = '< kitsu | mal > <username> [number of videos]';
		this.description= 'Get the opening or ending of a random anime of your completed anime library ! (Supports Kitsu ' +
			'and MyAnimeList accounts).\n Get a playlist by adding the number of songs you want ! ';
	}

	async execute(message, args){
		const Youtube = YoutubeApi.getInstance();
		const logger = ServiceManager.getLogger();

		//https://discord.js.org/#/docs/main/stable/class/MessageEmbedVideo

		if(args.length >= 3 && Number.isInteger(parseInt(args[3]))) {
			const promises = [];
			for(let i = 0; i < args[3]; i++) {
				promises.push(this.getAnimeVideoId(message, args));
			}
			Promise.all(promises)
				.then(ids=> {
					return Youtube.getPlayList(ids)
						.then(url => message.channel.send(url))
						.catch(error=>logger.error(`oped url shortener ${ error.toString()}`));
				})
				.catch(error=>logger.error(`oped list error ${ error.toString()}`));
		}
		else{
			Youtube.getVideo(this.getAnimeVideoId(message, args))
				.then(videoUrl => message.channel.send(videoUrl))
				.catch(error=>logger.error(`oped list ${ error.toString()}`));
		}
	}

	async getAnimeVideoId(message, args) {

		const Youtube = YoutubeApi.getInstance();
		const logger = ServiceManager.getLogger();

		let opEd = (args[1] === 'op') ? 'opening' : 'ending';
		if(args[1] === 'oped') opEd = Math.floor(Math.random() * 2) === 1 ? 'opening' : 'ending';


		let self = this;
		return AnimeFactory.getRandomAnime(args[1], args[2]).then(async anime => {
			if(!anime) {
				message.channel.send(`Error happened : Maybe check for the spelling of your username : **${args[2]}**`);
				return anime;
			}
			try{
				const videoId = await Youtube.getVideoId(`${anime } ${ opEd}`);
				// console.log(`youtube id ${ videoId } anime : ${ anime}`);
				if(!videoId) {
					return self.getAnimeVideoId(message, args);
				}
				return videoId;
			}
			catch(err) {
				return self.getAnimeVideoId(message, args);
			}
		}).catch(err=>{
			return self.getAnimeVideoId(message, args);
		});
	}
}

export default new OpEdCommand();
