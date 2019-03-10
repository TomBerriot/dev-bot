export default class Post {
	public title;
	public imgSource;
	public sourceLink;

	constructor(title, imgSource, sourceLink = undefined){
		this.title = title;
		this.imgSource = imgSource;
		this.sourceLink = sourceLink;
	}
	
};
