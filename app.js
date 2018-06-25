const express = require('express');
const app = express();

const server = require('http').createServer(app);

const ServiceManager = require('./ServiceManager');
const appRootDir = require('app-root-dir').get();
const TumblrApi = require('./SourceManager/TumblrApi');
const DevMemesFactory = require('./SourceManager/DevMemesFactory');
const GirlFactory = require('./SourceManager/GirlFactory');
const DiscordBot = require('./Services/DiscordBot/DiscordBot');
const KitsuApi = require('./SourceManager/KitsuApi');
const YoutubeApi = require('./SourceManager/YoutubeApi');
const AnimeFactory = require('./SourceManager/AnimeFactory');

const config = ServiceManager.getConfig();

//APP SERVICES SETUP 



//Http Server request call back
app.get('/', function(req, res) {
	res.send('');
});

//HTTP server listening setup
let ServerStartup = new Promise((resolve, reject) => {
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
});


ServerStartup.then(async  ()=>{
	try{
		//BD connexion setup
		await ServiceManager.getManagementManager().authenticate();
		// Then, DiscordBot connexion setup
		await DiscordBot.setup(ServiceManager);

		//APIS connexion setup
		TumblrApi.setup(ServiceManager);
		KitsuApi.setup(ServiceManager);
		YoutubeApi.setup(ServiceManager);

		//Content Factories setup
		DevMemesFactory.setup(ServiceManager);
		GirlFactory.setup(ServiceManager);
		AnimeFactory.setup(ServiceManager);

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
	}catch(err){
		ServiceManager.getLogger().error(`App error : ${ err}`);
	}
}).catch((err) => {
	ServiceManager.getLogger().error(`App error : ${ err}`);
});


