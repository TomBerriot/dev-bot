import express from 'express';
const app = express();

import http from 'http'
const server = http.createServer(app);

import logger from './Logger';
import config from './config';
import TumblrApi from './SourceManager/TumblrApi';
import DiscordBot from './DiscordBot';

//Http Server request call back
app.get('/', function(req, res) {
	res.send('');
});

//HTTP server listening setup
let ServerStartup = new Promise((resolve, reject) => {
	try {
		server.listen(config.server.port, () => {
			resolve();
		});
	}
	catch (e) {
		reject(e);
	}
});

ServerStartup.then(async  ()=>{
	await DiscordBot.setup();

	TumblrApi.setup();

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
}).catch((err) => {
	logger.error(`App error : ${ err}`);
});


