const appRootPath = require('app-root-path');
require('dotenv').config({ path: `${appRootPath}/.env` });

module.exports = {
  discordBot:{
      prefix: process.env.PREFIX,
      token: process.env.DISCORD_TOKEN
  },
  tumblrApi: {
      apikey: process.env.TUMBLR_API_KEY,
      secretKey: process.env.TUMBLR_SECRET_KEY,
      token: process.env.TUMBLR_TOKEN,
      tokenSecret: process.env.TUMBLR_TOKEN_SECRET,
  },
  logger: {
      strategies: [
          {
              type: 'file',
              level: process.env.LOG_LEVEL,
              name: 'file',
              options: {
                filename: 'application',
              },
          },
          {
              type: 'console',
              level: process.env.LOG_LEVEL,
              name: 'console',
              options: {},
          },
      ],
      options: {},
  },
  management: {
      host: process.env.MANAGEMENT_HOST,
      port: Number(process.env.MANAGEMENT_PORT),
      database: process.env.MANAGEMENT_DB,
      username: process.env.MANAGEMENT_USERNAME,
      password: process.env.MANAGEMENT_PASSWORD,
      dialect: process.env.MANAGEMENT_DIALECT,
      logging: Boolean.valueOf(process.env.MANAGEMENT_LOGGING),
  },
  server: {
      port: process.env.PORT,
  }
};