const Post = function Meme(title, imgSource, sourceLink = undefined) {
	this.title = title;
	this.imgSource = imgSource;
	this.sourceLink = sourceLink;
};

module.exports = Post;
