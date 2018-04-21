const Kitsu = require('kitsu/node');

let ServiceManager = null;

const KitsuClient = function KitsuApi() {
	this.client = null;
	const kitsuConfig = ServiceManager.getConfig().kitsuApi;
	try{
		this.client = new Kitsu({
			headers: {
				'User-Agent': 'pedo-dev-bot/1.0.0 (github.com/Cleverdawn/pedo-dev-bot)',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
	}
	catch(error) {
		ServiceManager.getLogger().error('KitsuApi connexion : ' + error);
	}
};

KitsuClient.prototype.getClient = function getClient() {
	return this.client;
};

const KitsuApi = (function() {
	let instance;

	function createInstance() {
		return new KitsuClient();
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
		setup: function(serviceManager) {
			ServiceManager = serviceManager;
			if (!instance) {
				instance = createInstance();
			}
		},
	};
})();

module.exports = KitsuApi;
