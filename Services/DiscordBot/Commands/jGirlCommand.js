const ServiceManager = require('../../../ServiceManager');
const GirlFactory = require('../../../SourceManager/GirlFactory').GirlFactory;

const NonceIdentifier = 5555555;

const execute = async function execute(message, args) {
	const logger = ServiceManager.getLogger();

	// https://she-cool.tumblr.com/
	GirlFactory.getRandomGirl().then(girl=>{
		message.channel.send(`# ${ girl.title}`, { files: girl.imgSource, nonce: NonceIdentifier, code: true })
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
};

const reactionHandler = async function reactionHandler(reaction, user) {
	const logger = ServiceManager.getLogger();

	if(reaction.count === 2 && reaction._emoji.name === '➕') {
		execute(reaction.message);
	}


};


module.exports = {
	name: 'jgirl',
	args: false,
	aliases: ['jg'],
	usage: '',
	guildOnly: false,
	ownerGuildOnly:false,
	description: 'Send random beautiful japanese girls <3',
	nonce: NonceIdentifier,
	execute,
	reactionHandler,
};
