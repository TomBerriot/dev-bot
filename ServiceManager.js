const Logger = require('./Services/Logger/Logger');
const StrategyFactory = require('./Services/Logger/Strategy/StrategyFactory').StrategyFactory;
const Config = require('./Services/Config/Config');
const ManagementManager = require('./Services/DataManager/Management/Manager');
let Redis = require('ioredis');

let managerSetup = false;
let logger = null;
let redisClient = null;
/**
 * @module ServiceManager
 */
module.exports = {
  /**
   * @function
   * @description get the logger
   * @returns {Logger}
   */
  getLogger: function getLogger() {
    if (!logger) {
      logger = new Logger(Config.logger.options);
      Config.logger.strategies.forEach((strategy) => {
        logger.add(StrategyFactory.create(
          strategy.type, strategy.name, strategy.level, strategy.options)
        );
      });
    }
    return logger;
  },
  /**
   * @function
   * @description get the config
   * @return {Config}
   */
  getConfig: function getConfig() {
    return Config;
  },
  /**
   * @function
   * @description get the manager management
   * @return {Manager}
   */
  getManagementManager: function getManagementManager() {
    if (!managerSetup) {
      ManagementManager.setup(
        Config.management.database,
        Config.management.username,
        Config.management.password,
        {
          host: Config.management.host,
          port: Config.management.port,
          dialect: Config.management.dialect,
          logging: Config.management.logging,
          operatorsAliases: false,
        }
      );
      managerSetup = true;


    }
    return ManagementManager;
  },

  getRedis: function getRedis() {
      if (!redisClient) {
          redisClient = new Redis(this.getConfig().redis.url);
      }
      return redisClient;
  },


};
