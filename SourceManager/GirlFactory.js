const TokujiroSource = require('../SourceManager/Sources/TokujiroSource');

let ServiceManager = null;

let GirlSourceArray = null;

module.exports.GirlFactory = {

	setup: function setup(serviceManager) {
		ServiceManager = serviceManager;
		const tokujiroSource = new TokujiroSource(ServiceManager, 'tokujiro.tumblr.com');

		GirlSourceArray = [
			tokujiroSource,
		];
	},
	getRandomGirl: function getRandomGirl() {
		const sourceIndex = Math.floor(Math.random() * GirlSourceArray.length);
		return GirlSourceArray[sourceIndex].getRandomGirl();
	},
};
