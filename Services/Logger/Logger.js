const winston = require('winston');

/**
 * @constructor
 * @param {Object} [options={}]
 * @param {Boolean} [options.exitOnError=false]
 */
const Logger = function Logger(options = {}) {
	this.options = {};
	this.options.levels = {
		emergency: 0,
		alert: 1,
		critical: 2,
		error: 3,
		warning: 4,
		notice: 5,
		info: 6,
		debug: 7,
	};
	this.options.colors = {
		emergency: 'red',
		alert: 'red',
		critical: 'red',
		error: 'red',
		warning: 'yellow',
		notice: 'grey',
		info: 'green',
		debug: 'blue',
	};
	if (typeof options.exitOnError === 'undefined') {
		this.options.exitOnError = false;
	}
	this.winstonLogger = new winston.Logger(this.options);
};

/**
 * @function
 * @param {Strategy} strategy
 * @description Add a strategy
 */
Logger.prototype.add = function add(strategy) {
	strategy.register(this.winstonLogger);
};

/**
 * @function
 * @param {String} message
 * @description System is unusable
 */
Logger.prototype.emergency = function emergency(message) {
	this.winstonLogger.emergency(message);
};

/**
 * @function
 * @param {String} message
 * @description Action must be taken immediately.
 */
Logger.prototype.alert = function alert(message) {
	this.winstonLogger.alert(message);
};

/**
 * @function
 * @param {String} message
 * @description Critical conditions.
 */
Logger.prototype.critical = function critical(message) {
	this.winstonLogger.critical(message);
};

/**
 * @function
 * @param {String} message
 * @description Runtime errors that do not require immediate action but should typically
 * be logged and monitored.
 */
Logger.prototype.error = function error(message) {
	this.winstonLogger.error(message);
};

/**
 * @function
 * @param {String} message
 * @description Exceptional occurrences that are not errors.
 */
Logger.prototype.warning = function warning(message) {
	this.winstonLogger.warning(message);
};

/**
 * @function
 * @param {String} message
 * @description Normal but significant events.
 */
Logger.prototype.notice = function notice(message) {
	this.winstonLogger.notice(message);
};

/**
 * @function
 * @param {String} message
 * @description Interesting events.
 */
Logger.prototype.info = function info(message) {
	this.winstonLogger.info(message);
};

/**
 * @function
 * @param {String} message
 * @description Detailed debug information.
 */
Logger.prototype.debug = function debug(message) {
	this.winstonLogger.debug(message);
};
module.exports = Logger;
