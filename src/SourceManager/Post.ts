export default class Post {
    public title: string;
    public imgSource: string;
    public sourceLink?: string;

    constructor(title: string, imgSource: string, sourceLink?: string) {
        this.title = title;
        this.imgSource = imgSource;
        this.sourceLink = sourceLink;
    }
}
