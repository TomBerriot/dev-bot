import ServiceManager from '../../../ServiceManager';
import DevMemesFactory from '../../../SourceManager/DevMemesFactory';
import Command from './abs/Command';

class DevMemesCommand extends Command {
	constructor () {
		super();
		this.name= 'devMemes';
		this.aliases= ['d', 'dev'];
		this.description= 'Get an infinite number of developers memes !';
		this.nonce= 666666;
	}

	async sendRandomMeme(message, args) {
		const logger = ServiceManager.getLogger();

		let self = this;

		console.log(message.content)
		DevMemesFactory.getRandomMeme().then(meme=>{
			if(meme.imgSource.includes('i.minus.com')) {
				self.sendRandomMeme(message, args);
				return 0;
			}
			console.log(meme)
			message.channel.send(`# ${ meme.title}`, { files: [meme.imgSource], nonce: self.nonce, code: true })
				.then(msg=>{
					return msg.react('➕');
				})
				.catch(error=>{
					logger.error(`${error } ${ meme.title } ${ meme.imgSource } error code : ${ error.code}`);
					if(error.code === 40005 || error.code === 413) {
						message.channel.send('Image file of this meme was too large lol. Loading new dank meme. :incoming_envelope:');
					}
					else{
						message.channel.send('Meme too old, can\'t open dead link. Loading new dank meme. :incoming_envelope:');
					}
					self.sendRandomMeme(message, args);
				});
		}).catch(error=>{
			logger.error(`Dev Memes Command : ${ error}`);
		});
	}

	async execute(message, args, reactionUser){
		const logger = ServiceManager.getLogger();

		const User = ServiceManager.getManagementManager().get('User');

		let userTag = message.author.tag;
		if(reactionUser) userTag = reactionUser.tag;

		User.findOrCreate(false, { where:{ username:userTag } })
			.then(user=>{
				user = user[0];
				if(((user.memeCounter + 1) % 10) === 0) {
					const scoldStr = 'Stop lazing around, go work you lil\' cunt. :japanese_goblin: ';
					if(reactionUser) message.channel.send(`<@${reactionUser.id}> ${scoldStr}`);
					else message.author.reply(scoldStr);
				}

				user.update({ memeCounter: user.memeCounter + 1 });
			});

		this.sendRandomMeme(message, args);
	}

	async reactionHandler(reaction, user){
		const logger = ServiceManager.getLogger();

		logger.info(`reaction : ${reaction._emoji.name} ; author : ${ user.tag } ; server : ${ reaction.message.guild ? reaction.message.guild.name : 'no guild '}`);

		if(reaction.count === 2 && reaction._emoji.name === '➕') {
			this.execute(reaction.message, null, user);
		}
	}
}

export default new DevMemesCommand();