const Source = function Source(source) {
	this.source = source;
};


Source.prototype.getRandomMeme = function getRandomMeme() {
	throw new Error('You must implement the getRandomMeme function');
};

module.exports = Source;
