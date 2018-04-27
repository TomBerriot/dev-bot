import GirlFactory from '../../../SourceManager/GirlFactory';
import ServiceManager from '../../../ServiceManager';
import Command from './abs/Command';

class JGirlsCommand extends Command {
	constructor () {
		super();
		this.name= 'jgirl';
		this.aliases= ['jg'];
		this.description= 'Send random beautiful japanese girls <3';
		this.nonce = 5555555;
	}

	async execute(message, args){
		const logger = ServiceManager.getLogger();

		// https://she-cool.tumblr.com/
		let self = this;
		GirlFactory.getRandomGirl().then(girl=>{
			message.channel.send(`# ${ girl.title} ${ girl.sourceLink ? ' , Source : ' + girl.sourceLink : ''}   `, { files: girl.imgSource, nonce: self.nonce, code: true })
				.then(msg=>{
					return msg.react('➕');
				})
				.catch(error=>{
					logger.error(`${error } ${ girl.title } ${ girl.imgSource } error code : ${ error.code}`);
					if(error.code === 20009) {
						message.channel.send('Disable discord analyzer of content to see these (barely ?) NSFW jap girls <3');
					}
				});
		}).catch(error=>{
			logger.error(`${error } error code : ${ error.code}`);
		});
	}

	async reactionHandler(reaction, user) {
		const logger = ServiceManager.getLogger();

		logger.info(`reaction : ${reaction._emoji.name} ; author : ${ user.tag } ; server : ${ reaction.message.guild ? reaction.message.guild.name : 'no guild '}`);

		if(reaction.count === 2 && reaction._emoji.name === '➕') {
			this.execute(reaction.message);
		}


	}
}

export default new JGirlsCommand();