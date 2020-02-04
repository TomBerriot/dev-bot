import express from "express";
import http from "http";
import config from "./config";
import DiscordBot from "./DiscordBot";
import logger from "./Logger";
import TumblrApi from "./SourceManager/TumblrApi";
const app = express();

const server = http.createServer(app);

// Http Server request call back
app.get("/", (req, res) => {
  res.send("");
});

// HTTP server listening setup
const ServerStartup = new Promise((resolve, reject) => {
  try {
    server.listen(config.server.port, () => {
      resolve();
    });
  } catch (e) {
    reject(e);
  }
});

ServerStartup.then(async () => {
  await DiscordBot.setup();

  TumblrApi.setup();

  process.once("SIGTERM", () => {
    server.close(v => {
      console.log(v);
    });
    process.exit();
  });
  process.once("SIGINT", () => {
    server.close(v => {
      console.log(v);
    });
    process.exit();
  });
}).catch(err => {
  logger.error(`App error : ${err}`);
});
