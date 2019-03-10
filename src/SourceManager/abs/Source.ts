import Post from '../Post'

export default class Source {
	public source: string;

	constructor(source: string){
		this.source = source;
	}
	
	public async getRandomMeme(): Promise<Post> {
		throw new Error('You must implement the getRandomMeme function');
	}
};
