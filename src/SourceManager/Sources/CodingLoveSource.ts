import { JSDOM } from 'jsdom';
import logger from '../../Logger';
import Source from '../abs/Source';
import Post from '../Post';
import tumblr from '../TumblrApi';

export default class CodingLoveSource extends Source {
    constructor(source: string) {
        super(source);
    }

    public async getRandomMeme(): Promise<Post> {
        const self = this;
        return tumblr.client
            .blogInfo(this.source)
            .then(data => {
                const offset = Math.floor(
                    Math.random() * data.blog.total_posts
                );
                return tumblr.client.blogPosts(self.source, {
                    limit: 1,
                    offset,
                });
            })
            .then(data => {
                const post = data.posts[0];
                const dom = new JSDOM(post.body);
                return new Post(
                    post.summary,
                    dom.window.document.querySelector('img').src
                );
            })
            .catch(error => {
                logger.error(`Coding love random meme : ${error}`);
            });
    }
}
