const TokujiroSource = require('../SourceManager/Sources/TokujiroSource');
const IgladSource = require('../SourceManager/Sources/IgladSource');

let ServiceManager = null;

let GirlSourceArray = null;

module.exports = {

	setup: function setup(serviceManager) {
		ServiceManager = serviceManager;
		const tokujiroSource = new TokujiroSource(ServiceManager, 'tokujiro.tumblr.com');
		const igladSource = new IgladSource(ServiceManager, 'igladbehh.tumblr.com');
		const cutiejpn = new IgladSource(ServiceManager, 'cutiejpn.tumblr.com');
		const kawaiikoatsume = new IgladSource(ServiceManager, 'kawaiikoatsume.tumblr.com');
		const shecool = new IgladSource(ServiceManager, 'she-cool.tumblr.com');
		const pictureart = new IgladSource(ServiceManager, 'pictureart.tumblr.com');


		GirlSourceArray = [
			tokujiroSource,
			igladSource,
			cutiejpn,
			kawaiikoatsume,
			shecool,
			pictureart,
		];
	},
	getRandomGirl: function getRandomGirl() {
		const sourceIndex = Math.floor(Math.random() * GirlSourceArray.length);
		return GirlSourceArray[sourceIndex].getRandomGirl();
	},
};
