const util = require('util');
const Repository = require('./Abs/Repository');
const merge = require('deepmerge');
const Errors = require('../../../Common/Errors');

/**
 * @constructor
 * @param {Array} models
 * @extends Repository
 */
const UserRepository = function UserRepository(models) {
  Repository.call(this, 'User', models);
};
util.inherits(UserRepository, Repository);

/**
 * @function
 * @param {Boolean} [exclude=true]
 * @param {Boolean} [include=false]
 * @param {Object} [options={}]
 * @returns {Promise}
 */
UserRepository.prototype.findAll = function findAll(exclude = true, include = false, options = {}) {
  const opt = merge({
    attributes: { },
  }, options);
  return Repository.prototype.findAll.call(this, exclude, include, opt);
};


module.exports = UserRepository;
