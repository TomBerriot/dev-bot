const Youtube = require('youtube-node');
const youtube = new Youtube();


let ServiceManager = null;

const YoutubeClient = function YoutubeClient() {
	const youtubeApiConfig = ServiceManager.getConfig().youtubeApi;
	try{
		youtube.setKey(youtubeApiConfig.apiKey);
	}
	catch(error) {
		ServiceManager.getLogger().error('youtubeclient setKey : ' + error);
	}

};

YoutubeClient.prototype.getVideo = function getVideo(query) {
	return new Promise(function(resolve, reject) {
		youtube.search(query, 1, function(error, result) {
			if (error) ServiceManager.getLogger().error('youtubeclient : ' + error);
			else resolve('https://www.youtube.com/watch?v=' + result.items[0].id.videoId);
		});
	});
};

const YoutubeApi = (function() {
	let instance;

	function createInstance() {
		if (!instance) {
			instance = new YoutubeClient();
		}
		return instance;
	}

	return {
		getInstance: function() {
			return createInstance();
		},
		setup: function(serviceManager) {
			ServiceManager = serviceManager;
			createInstance();
		},
	};
})();

module.exports = YoutubeApi;
