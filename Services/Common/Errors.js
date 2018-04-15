const util = require('util');

/**
 * @function
 * @param {string} parameters - The missing parameters
 * @returns {Error}
 */
exports.MissingRequiredParameterError = function MissingRequiredParameterError(message) {
  Error.captureStackTrace(this);
  this.message = message;
  this.name = this.constructor.name;
};

util.inherits(exports.MissingRequiredParameterError, Error);

