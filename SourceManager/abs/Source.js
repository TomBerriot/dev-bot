const Source = function Source(source) {
	this.source = source;
};


Source.prototype.getRandomMeme = function getRandomMeme() {
	throw new Error('You must implement the getRandomMeme function');
};

Source.prototype.getRandomGirl = function getRandomGirl() {
	throw new Error('You must implement the getRandomGirl function');
};

module.exports = Source;
