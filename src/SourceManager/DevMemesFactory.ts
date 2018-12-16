import CodingLoveSource from 'src/SourceManager/Sources/CodingLoveSource';
import Source from 'src/SourceManager/abs/Source';
import Post from 'src/SourceManager/Post'

class DevMemesFactory{
	private DevMemesSourceArray: Array<Source>;

	constructor(){
		const CodingLove = new CodingLoveSource('thecodinglove.tumblr.com');
		this.DevMemesSourceArray = [
			CodingLove,
		];
	}

	public getRandomMeme(): Promise<Post> {
		const sourceIndex = Math.floor(Math.random() * this.DevMemesSourceArray.length);
		let source: Source = this.DevMemesSourceArray[sourceIndex];
		return source.getRandomMeme();
	}
}

export default new DevMemesFactory();

