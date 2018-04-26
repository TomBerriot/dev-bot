const TokujiroSource = require('../SourceManager/Sources/TokujiroSource');
const IgladSource = require('../SourceManager/Sources/IgladSource');

let ServiceManager = null;

let GirlSourceArray = null;

module.exports = {

	setup: function setup(serviceManager) {
		ServiceManager = serviceManager;
		const tokujiroSource = new TokujiroSource(ServiceManager, 'tokujiro.tumblr.com');
		const igladSource = new IgladSource(ServiceManager, 'igladbehh.tumblr.com');

		GirlSourceArray = [
			tokujiroSource,
			igladSource,
		];
	},
	getRandomGirl: function getRandomGirl() {
		const sourceIndex = Math.floor(Math.random() * GirlSourceArray.length);
		return GirlSourceArray[sourceIndex].getRandomGirl();
	},
};
