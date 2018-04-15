/* eslint-disable no-param-reassign */
/**
 * @constructor
 * @param {string} level
 * @param {string} name
 * @param {Object} [options={}]
 * @param {Boolean} [options.handleExceptions=true]
 * @param {Boolean} [options.humanReadableUnhandledException=true]
 * @param {Boolean} [options.json=false]
 * @param {string} [options.dateFormat='ISO']
 */
const Strategy = function Strategy(level, name, options = {}) {
  this.options = {};
  this.options.level = typeof level === 'undefined' ? 'info' : level;
  if (typeof options.handleExceptions === 'undefined') {
    this.options.handleExceptions = true;
  }
  if (typeof options.humanReadableUnhandledException === 'undefined') {
    this.options.humanReadableUnhandledException = true;
  }
  if (typeof options.json === 'undefined') {
    this.options.json = false;
  }
  if (typeof options.dateFormat === 'undefined') {
    options.dateFormat = 'ISO';
  }
  switch (options.dateFormat) {
    case 'UTC' : {
      this.options.timestamp = () => (new Date()).toUTCString();
      break;
    }
    default:
    case 'ISO' : {
      this.options.timestamp = () => (new Date()).toISOString();
      break;
    }
  }
  this.options.name = name;
  this.transport = {};
};

/*
 * @constructor
 * @param {Logger} logger
 * @description Register the strategy logger
 */
Strategy.prototype.register = function register(logger) {
  logger.add(this.transport, this.options);
};
module.exports = Strategy;
