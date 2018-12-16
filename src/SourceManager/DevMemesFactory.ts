import CodingLoveSource from './Sources/CodingLoveSource';
import Source from './abs/Source';
import Post from './Post'

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

