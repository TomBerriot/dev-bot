const Meme = require('../Meme');
const Source = require('../abs/Source');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var tumblrClient = null;

var ServiceManager = null;

const CodingLoveSource = function CodingLoveSource(serviceManager, source) {
    Source.call(this, source);
    ServiceManager = serviceManager;
    tumblrClient = require('../TumblrApi').TumblrApi.getInstance().getClient();
};

CodingLoveSource.prototype.getRandomMeme = function getRandomMeme() {
    return tumblrClient.blogInfo(this.source)
        .then(data=>{
            var offset = Math.floor(Math.random() * data.blog.total_posts)
            return tumblrClient.blogPosts(this.source, {offset: offset, limit: 1})
        })
        .then(data=>{
            var post = data.posts[0];
            const dom = new JSDOM(post.body);
            return new Meme(post.summary, dom.window.document.querySelector('img').src);
        }).catch(error=>{
            ServiceManager.getLogger().error("Coding love random meme : " + error);
        })
};

module.exports = CodingLoveSource;
