const tumblr = require('tumblr.js');

var ServiceManager = null;

const TumblrClient = function TumblrApi() {
    this.client = null;
    let tumblrApiConfig = ServiceManager.getConfig().tumblrApi;
    try{
        this.client = new tumblr.createClient({
            consumer_key: tumblrApiConfig.apikey,
            consumer_secret: tumblrApiConfig.secretKey,
            token: tumblrApiConfig.token,
            token_secret: tumblrApiConfig.tokenSecret,
            returnPromises: true,
        });
    }catch(error){
        ServiceManager.getLogger().error("Tumblr connexion : " + error);
    }
};

TumblrClient.prototype.getClient= function getClient() {
    return this.client;
};

let TumblrApi = (function () {
    let instance;

    function createInstance() {
        let client = new TumblrClient("I am the instance");
        return client;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        setup: function(serviceManager){
            ServiceManager = serviceManager;
            let tumblrApiConfig = ServiceManager.getConfig().tumblrApi;
            if (!instance) {
                instance = createInstance();
            }
        }
    };
})();

module.exports = TumblrApi;
