const Post = require('../Post');
const Source = require('../abs/Source');
let tumblrClient = null;

let ServiceManager = null;

const IgladSource = function IgladSource(serviceManager, source) {
	Source.call(this, source);
	this.source = source;
	ServiceManager = serviceManager;
	tumblrClient = require('../TumblrApi').getInstance().getClient();
};

IgladSource.prototype.getRandomGirl = function getRandomGirl() {
	return tumblrClient.blogInfo(this.source)
		.then(data=>{
			const offset = Math.floor(Math.random() * data.blog.total_posts);
			return tumblrClient.blogPosts(this.source, { offset: offset, limit: 1 });
		})
		.then(data=>{
			const post = data.posts[0];
			const urls = [];

			for(let i = 0; i < post.photos.length; i++) {
				urls.push(post.photos[i].original_size.url);
			}
			return new Post(`${post.summary !== '' ? `${post.summary },` : '' } Tags [${ post.tags.toString() }]`, urls);
		}).catch(error=>{
			ServiceManager.getLogger().error(`IgladSource random girl : ${ error}`);
		});
};

module.exports = IgladSource;
