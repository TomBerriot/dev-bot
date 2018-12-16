import Post from 'src/SourceManager/Post';
import Source from 'src/SourceManager/abs/Source';
import { JSDOM }  from 'jsdom';
import logger from 'src/Logger'
import tumblr from 'src/SourceManager/TumblrApi';
let tumblrClient = tumblr.client;

export default class CodingLoveSource extends Source{
	constructor(source: string){
		super(source)
	}

	public async getRandomMeme(): Promise<Post> {
		const self = this;
		return tumblrClient.blogInfo(this.source)
			.then(data=>{
				console.log(data.blog.total_posts);
				const offset = Math.floor(Math.random() * data.blog.total_posts);
				return tumblrClient.blogPosts(self.source, { offset: offset, limit: 1 });
			})
			.then(data=>{
				const post = data.posts[0];
				const dom = new JSDOM(post.body);
				return new Post(post.summary, dom.window.document.querySelector('img').src);
			}).catch(error=>{
				logger.error(`Coding love random meme : ${ error}`);
			});
	};
};