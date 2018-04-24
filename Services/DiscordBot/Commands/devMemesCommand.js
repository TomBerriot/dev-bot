const ServiceManager = require('../../../ServiceManager');
const DevMemesFactory = require('../../../SourceManager/DevMemesFactory').DevMemesFactory;

const NonceIdentifier = 666666;

const sendRandomMeme = async function sendRandomMeme(message, args) {
	const logger = ServiceManager.getLogger();

	DevMemesFactory.getRandomMeme().then(meme=>{
		if(meme.imgSource.includes('i.minus.com')) {
			sendRandomMeme(message, args);
			return 0;
		}
		message.channel.send(`# ${ meme.title}`, { files: [meme.imgSource], nonce: NonceIdentifier, code: true })
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
				sendRandomMeme(message, args);
			});
	}).catch(error=>{
		logger.error(`Dev Memes Command : ${ error}`);
	});
};

const execute = async function execute(message, args, reactionUser) {
	const logger = ServiceManager.getLogger();

	const User = ServiceManager.getManagementManager().get('User');

	let userTag = message.author.tag;
	if(reactionUser) userTag = reactionUser.tag;

	User.findOrCreate(false, { where:{ username:userTag } })
		.then(user=>{
			user = user[0];
			if(((user.memeCounter + 1) % 10) === 0) {
				const scoldStr = 'Stop lazing around, go work you lil\' cunt. :japanese_goblin: ';
				if(reactionUser) message.author.send(scoldStr);
				else reactionUser.send(scoldStr);
			}

			user.update({ memeCounter: user.memeCounter + 1 });
		});

	sendRandomMeme(message, args);
};

const reactionHandler = async function reactionHandler(reaction, user) {
	const logger = ServiceManager.getLogger();

	if(reaction.count === 2 && reaction._emoji.name === '➕') {
		execute(reaction.message, null, user);
	}
};

module.exports = {
	name: 'devMemes',
	args: false,
	aliases: ['d', 'dev'],
	usage: '',
	guildOnly: false,
	ownerGuildOnly:false,
	description: 'Get an infinite number of developers memes !',
	nonce: NonceIdentifier,
	execute,
	reactionHandler,
};
