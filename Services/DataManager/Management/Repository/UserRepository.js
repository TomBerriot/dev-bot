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

UserRepository.prototype.findOrCreate = function findOrCreate(exclude, params) {
    let opt = merge({
        attributes: { exclude: exclude ? ['created_at', 'updated_at', 'created_by', 'updated_by'] : [] },
    }, params);
    return this.models[this.name].findOrCreate(opt);
};

module.exports = UserRepository;
