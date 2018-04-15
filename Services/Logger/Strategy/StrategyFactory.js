const ConsoleStrategy = require('./ConsoleStrategy');
const FileStrategy = require('./FileStrategy');

/**
 * @description Enum for logger strategy
 * @readonly
 * @enum {number}
 */
const StrategyEnum = {
  CONSOLE: 'console',
  FILE: 'file'
};

module.exports.StrategyEnum = StrategyEnum;

/**
 * @module StrategyFactory
 * @description The logger strategy factory
 */
module.exports.StrategyFactory = {
  /**
   * @function
   * @description Create
   * @param {StrategyEnum|string} type
   * @param {string} level
   * @param {string} name
   * @param {Object} options
   * @returns {Strategy}
   */
  create: function create(type, name, level, options) {
    let strategy = null;
    switch (type) {
      case StrategyEnum.CONSOLE : {
        strategy = new ConsoleStrategy(level, name, options);
        break;
      }
      case StrategyEnum.FILE : {
        strategy = new FileStrategy(level, name, options);
        break;
      }
      default: {
        throw new Error('Invalid strategy type');
      }
    }
    return strategy;
  }
};
