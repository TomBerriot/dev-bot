const express = require('express');
const app = express();

const server = require('http').createServer(app);

const ServiceManager = require('./ServiceManager');
const appRootDir = require('app-root-dir').get();
const TumblrApi = require('./SourceManager/TumblrApi').TumblrApi;
const DevMemesFactory = require('./SourceManager/DevMemesFactory').DevMemesFactory;
const DiscordBot = require('./Services/DiscordBot/DiscordBot').DiscordBot;

const config = ServiceManager.getConfig();

app.get('/', function (req, res) {
    res.send('');
});


DiscordBot.setup(ServiceManager)
    .then(() => ServiceManager.getManagementManager().authenticate())
    .then(() => {
        TumblrApi.setup(ServiceManager);
        DevMemesFactory.setup(ServiceManager);
        ServiceManager.getManagementManager().sync()
    })
    .then(() => new Promise((resolve, reject) => {
        /**
         * APP
         */
        app.use(express.static(`${appRootDir}/app/Public`));

        const configServer = config.server;

        try {
            server.listen(configServer.port, () => {
                resolve();
            });
        } catch (e) {
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
        ServiceManager.getLogger().error("App error : " + err);
    });
