const Youtube = require('youtube-node');
const youtube = new Youtube();
const googl = require('goo.gl');


let ServiceManager = null;

const YoutubeClient = function YoutubeClient() {
	const youtubeApiConfig = ServiceManager.getConfig().youtubeApi;
	const googleShortenerApiKey = ServiceManager.getConfig().google.shortenerApiKey;
	try{
		youtube.setKey(youtubeApiConfig.apiKey);
		googl.setKey(googleShortenerApiKey);
	}
	catch(error) {
		ServiceManager.getLogger().error(`youtubeclient setKey : ${ error}`);
	}

};

// https://www.youtube.com/watch_videos?video_ids=0vrdgDdPApQ,cbut2K6zvJY

YoutubeClient.prototype.getVideoId = function getVideoId(query) {
	return new Promise(function(resolve, reject) {
		try{
			youtube.search(query, 1, function(error, result) {
				if(result.items.length === 0) {
					ServiceManager.getLogger().info(`Youtube search no results : ${ query} `);
				}
				else if (error) {
					ServiceManager.getLogger().error(`youtubeclient : ${ error}`);
				}
				else {
					resolve(result.items[0].id.videoId);
				}
				reject();
			});
		}
		catch(error) {
			ServiceManager.getLogger().error(`youtubeclient : ${ error}`);
			reject();
		}

	});
};

YoutubeClient.prototype.getVideo = function getVideo(videoIdPromise) {
	return videoIdPromise.then(videoId=> `https://www.youtube.com/watch?v=${ videoId}`);
};

YoutubeClient.prototype.getPlayList = function getPlayList(arrayIds) {
	let url = 'https://www.youtube.com/watch_videos?video_ids=';
	for (const id of arrayIds) {
		url += `${id },`;
	}
	url = url.substring(0, url.length - 1);
	return googl.shorten(url);
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
