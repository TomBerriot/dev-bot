import tumblr from 'tumblr.js';
import config from 'src/config'
import logger from 'src/Logger'

const tumblrApiConfig = config.tumblrApi;

class TumblrApi {
	public client;

	public setup(){
		try{
			this.client = new tumblr.createClient({
				consumer_key: tumblrApiConfig.apikey,
				consumer_secret: tumblrApiConfig.secretKey,
				token: tumblrApiConfig.token,
				token_secret: tumblrApiConfig.tokenSecret,
				returnPromises: true,
			});
		}
		catch(error) {
			logger.error(`Tumblr connexion : ${ error}`);
		}
	}
	
	
};

export default new TumblrApi();