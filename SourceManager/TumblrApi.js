const tumblr = require('tumblr.js');
var logger = require('../Services/Logger').getInstance().getLogger();

const TumblrClient = function TumblrApi() {
    this.client = null;
    try{
        this.client = new tumblr.createClient({
            consumer_key: process.env.TUMBLR_API_KEY,
            consumer_secret: process.env.TUMBLR_SECRET_KEY,
            token: process.env.TUMBLR_TOKEN,
            token_secret: process.env.TUMBLR_TOKEN_SECRET,
            returnPromises: true,
        });
    }catch(error){
        logger.error(error);
    }
};

TumblrClient.prototype.getClient= function getClient() {
    return this.client;
};

var TumblrApi = (function () {
    var instance;

    function createInstance() {
        var client = new TumblrClient("I am the instance");
        return client;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = {
    TumblrApi,
    TumblrClient
};
