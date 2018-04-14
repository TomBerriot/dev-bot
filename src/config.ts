import appRootPath from 'app-root-path';
import dotenv from 'dotenv';
dotenv.config({ path: `${appRootPath}/.env` });

export default {
	discordBot:{
		prefix: process.env.PREFIX || '?',
		token: process.env.DISCORD_TOKEN,
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
	server: {
		port: process.env.PORT,
	},
}