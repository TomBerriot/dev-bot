import tumblr from 'tumblr.js';
import config from '../config';
import logger from '../Logger';

const tumblrApiConfig = config.tumblrApi;

class TumblrApi {
  public client;

  public setup() {
    try {
      this.client = tumblr.createClient({
        consumer_key: tumblrApiConfig.apiKey,
        consumer_secret: tumblrApiConfig.secretKey,
        returnPromises: true,
        token: tumblrApiConfig.token,
        token_secret: tumblrApiConfig.tokenSecret,
      });
    } catch (error) {
      logger.error(`Tumblr connexion : ${error}`);
    }
  }
}

export default new TumblrApi();
