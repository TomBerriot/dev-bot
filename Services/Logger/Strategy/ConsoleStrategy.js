const Strategy = require('./Abs/Strategy');
const winston = require('winston');
const util = require('util');
const winstonConfig = require('winston/lib/winston/config');

/**
 * @constructor
 * @extends Strategy
 * @param {string} level
 * @param {string} name
 * @param {Object} [options={}]
 * @param {Boolean} [options.handleExceptions=true]
 * @param {Boolean} [options.humanReadableUnhandledException=true]
 * @param {string} [options.dateFormat='ISO']
 * @param {Boolean} [options.colorize=true]
 * @param {Boolean} [options.prettyPrint=true]
 */
const ConsoleStrategy = function ConsoleStrategy(level, name, options = {}) {
  Strategy.call(this, level, name, options);
  if (typeof options.prettyPrint === 'undefined') {
    this.options.prettyPrint = true;
  }
  if (typeof options.colorize === 'undefined') {
    this.options.colorize = true;
  }
  this.options.formatter = opt => `${opt.timestamp()} ${winstonConfig.colorize(opt.level, `[${opt.level.toUpperCase()}] `)}${undefined !== opt.message ? opt.message : ''
    }${opt.meta && Object.keys(opt.meta).length ? `\n\t${JSON.stringify(opt.meta)}` : ''}`;
  this.transport = winston.transports.Console;
};

util.inherits(ConsoleStrategy, Strategy);
module.exports = ConsoleStrategy;
