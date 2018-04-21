const Source = require('../abs/Source');
const axios = require('axios');
const parseString = require('xml2js').parseString;

const kitsuApi = null;

let ServiceManager = null;

const MyAnimeListSource = function MyAnimeListSource(serviceManager, source = null) {
	Source.call(this, source);
	ServiceManager = serviceManager;
};

MyAnimeListSource.prototype.getRandomAnime = async function getRandomAnime(username) {
	const url = 'https://myanimelist.net/malappinfo.php?u=' + username + '&status=completed&type=anime';

	return new Promise(function(resolve, reject) {
		axios.get(url).then(response => {
			if(response.status !== 200) {
				return null;
			}
			parseString(response.data, function(err, result) {
				const index = Math.floor(Math.random() * result.myanimelist.anime.length);
				resolve(result.myanimelist.anime[index].series_title[0]);

			});
		})
			.catch(error => {
				ServiceManager.getLogger().error('myanimelistsource: ' + error);
			});
	});
};

module.exports = MyAnimeListSource;
