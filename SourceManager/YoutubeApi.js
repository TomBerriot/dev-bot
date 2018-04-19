let Youtube = require("youtube-node");
let youtube = new Youtube();


let ServiceManager = null;

const YoutubeClient = function YoutubeClient() {
    let youtubeApiConfig = ServiceManager.getConfig().youtubeApi;
    youtube.setKey(youtubeApiConfig.apiKey)
};

YoutubeClient.prototype.getVideo = function getVideo(query) {
    return new Promise(function(resolve, reject) {
        youtube.search(query, 1, function(error, result) {
            if (error) reject(error);
            else resolve("https://www.youtube.com/watch?v="+ result.items[0].id.videoId);
        });
    });
};

let YoutubeApi = (function () {
    let instance;

    function createInstance() {
        if (!instance) {
            instance = new YoutubeClient();
        }
        return instance;
    }

    return {
        getInstance: function () {
            return createInstance();
        },
        setup: function(serviceManager){
            ServiceManager = serviceManager;
            createInstance();
        }
    };
})();

module.exports = YoutubeApi;
