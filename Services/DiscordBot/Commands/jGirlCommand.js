const ServiceManager = require('../../../ServiceManager');
const GirlFactory = require('../../../SourceManager/GirlFactory').GirlFactory;

const execute = async function execute(message, args) {
	const logger = ServiceManager.getLogger();

	GirlFactory.getRandomGirl().then(girl=>{
		message.channel.send(`\`\`\`asciidoc\n# ${ girl.title }\`\`\``, { files: [girl.imgSource] })
			.catch(error=>{
				logger.error(`${error } ${ girl.title } ${ girl.imgSource } error code : ${ error.code}`);
			});
	}).catch(error=>{
		logger.error(`${error } error code : ${ error.code}`);
	});
};

module.exports = {
	name: 'jgirl',
	args: false,
	aliases: ['jg'],
	usage: '',
	guildOnly: false,
	ownerGuildOnly:false,
	description: 'Send random beautiful japanese girls <3',
	execute,
};
