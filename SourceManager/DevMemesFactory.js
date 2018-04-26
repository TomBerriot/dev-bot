const CodingLoveSource = require('./Sources/CodingLoveSource');

let ServiceManager = null;

let DevMemesSourceArray = null;

module.exports = {
	setup: function setup(serviceManager) {
		ServiceManager = serviceManager;
		const CodingLove = new CodingLoveSource(ServiceManager, 'thecodinglove.com');
		DevMemesSourceArray = [
			CodingLove,
		];
	},
	getRandomMeme: function getRandomMeme() {
		const sourceIndex = Math.floor(Math.random() * DevMemesSourceArray.length);
		return DevMemesSourceArray[sourceIndex].getRandomMeme();
	},
};

