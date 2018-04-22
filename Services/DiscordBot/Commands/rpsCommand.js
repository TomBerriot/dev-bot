module.exports = {
	name: 'rps',
	args: false,
	aliases: [],
	usage: '',
	guildOnly: false,
	ownerGuildOnly:false,
	description: 'Rock :full_moon: , Paper :newspaper: ,  Scissors :scissors: !',
	async execute(message, args) {
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
	},
};