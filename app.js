const express = require('express');
const app = express();

const server = require('http').createServer(app);

const ServiceManager = require('./ServiceManager');
const appRootDir = require('app-root-dir').get();
const TumblrApi = require('./SourceManager/TumblrApi');
const DevMemesFactory = require('./SourceManager/DevMemesFactory').DevMemesFactory;
const GirlFactory = require('./SourceManager/GirlFactory').GirlFactory;
const DiscordBot = require('./Services/DiscordBot/DiscordBot').DiscordBot;
const KitsuApi = require('./SourceManager/KitsuApi');
const YoutubeApi = require('./SourceManager/YoutubeApi');
const AnimeFactory = require('./SourceManager/AnimeFactory').AnimeFactory;

const config = ServiceManager.getConfig();


app.get('/', function(req, res) {
	res.send('');
});


ServiceManager.getManagementManager().authenticate()
	.then(() =>{
		DiscordBot.setup(ServiceManager);
	})
	.then(() => {
		TumblrApi.setup(ServiceManager);
		KitsuApi.setup(ServiceManager);
		YoutubeApi.setup(ServiceManager);
	})
	.then(() => {
		DevMemesFactory.setup(ServiceManager);
		GirlFactory.setup(ServiceManager);
		AnimeFactory.setup(ServiceManager);
	})
	.then(() => new Promise((resolve, reject) => {
		app.use(express.static(`${appRootDir}/app/Public`));


		const configServer = config.server;

		try {
			server.listen(configServer.port, () => {
				resolve();
			});
		}
		catch (e) {
			reject(e);
		}
	}))
	.then(() => {
		process.once('SIGTERM', () => {
			server.close((v) => {
				console.log(v);
			});
			process.exit();
		});
		process.once('SIGINT', () => {
			server.close((v) => {
				console.log(v);
			});
			process.exit();
		});
	})
	.catch((err) => {
		ServiceManager.getLogger().error(`App error : ${ err}`);
	});
