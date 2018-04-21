const SourceFactory = function SourceFactory() {
};

SourceFactory.prototype.getRandomMeme = function getRandomMeme() {
	throw new Error('You must implement the getRandomMeme function');
};

module.exports = SourceFactory;
