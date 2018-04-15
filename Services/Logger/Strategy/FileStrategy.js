/* eslint-disable no-param-reassign */
const WinstonDailyRotateFile = require('winston-daily-rotate-file');
const util = require('util');
const Strategy = require('./Abs/Strategy');
const appRootPath = require('app-root-path');

/**
 * @constructor
 * @extends Strategy
 * @param {string} level
 * @param {string} name
 * @param {Object} [options={}]
 * @param {Boolean} [options.handleExceptions=true]
 * @param {Boolean} [options.humanReadableUnhandledException=true]
 * @param {Boolean} [options.json=false]
 * @param {string} [options.dateFormat='ISO']
 * @param {string} [options.datePattern='-yyyy-MM-dd.log']
 * @param {string} [options.path]
 * @param {string} [options.filename='application']
 */
const FileStrategy = function FileStrategy(level, name, options = {}) {
  Strategy.call(this, level, name, options);
  if (typeof options.filename === 'undefined') {
    this.options.filename = true;
  }
  if (typeof options.datePattern === 'undefined') {
    this.options.datePattern = '-yyyy-MM-dd.log';
  }
  if (typeof options.path === 'undefined') {
    options.path = `${appRootPath}/logs`;
  }
  if (typeof options.filename === 'undefined') {
    options.filename = 'application';
  }
  this.options.filename = `${options.path}/${options.filename}`;
  this.options.formatter = opt => `${opt.timestamp()} [${opt.level.toUpperCase()}] ${undefined !== opt.message ? opt.message : ''
    }${opt.meta && Object.keys(opt.meta).length ? `\n\t${JSON.stringify(opt.meta)}` : ''}`;
  this.transport = WinstonDailyRotateFile;
};

util.inherits(FileStrategy, Strategy);
module.exports = FileStrategy;
