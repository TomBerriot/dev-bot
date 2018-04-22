const Post = require('../Post');
const Source = require('../abs/Source');
let tumblrClient = null;

let ServiceManager = null;

const TokujiroSource = function TokujiroSource(serviceManager, source) {
	Source.call(this, source);
	this.source = source;
	ServiceManager = serviceManager;
	tumblrClient = require('../TumblrApi').getInstance().getClient();
};

TokujiroSource.prototype.getRandomGirl = function getRandomGirl() {
	return tumblrClient.blogInfo(this.source)
		.then(data=>{
			const offset = Math.floor(Math.random() * data.blog.total_posts);
			return tumblrClient.blogPosts(this.source, { offset: offset, limit: 1 });
		})
		.then(data=>{
			const post = data.posts[0];
			return new Post(`${post.summary !== '' ? `${post.summary },` : '' } Tags [${ post.tags.toString() }]`, post.photos[0].original_size.url);
		}).catch(error=>{
			ServiceManager.getLogger().error(`TokujiroSource random girl : ${ error}`);
		});
};

module.exports = TokujiroSource;
