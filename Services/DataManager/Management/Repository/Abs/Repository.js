const merge = require('deepmerge');
const Errors = require('../../../../Common/Errors');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

/**
 * @constructor
 * @param {string} name
 * @param {Array} models
 */
const Repository = function Repository(name, models) {
	this.name = name;
	this.models = models;
	Object.defineProperty(this, 'Name', {
		get() {
			return this.name;
		},
		set(n) {
			this.name = n;
		},
	});
};

/**
 * @function
 * @param {Boolean} [exclude=true]
 * @param {Boolean} [include=false]
 * @param {Object} [options={}]
 * @returns {Promise}
 */
Repository.prototype.findAll = function findAll(exclude = true, include = false, options = {}) {
	const opt = merge({
		attributes: { exclude: exclude ? ['created_at', 'updated_at', 'created_by', 'updated_by'] : [] },
	}, options);
	return this.models[this.name].findAll(opt);
};

/**
 * @function
 * @param {Number} id
 * @param {Boolean} [exclude=true]
 * @param {Boolean} [include=false]
 * @param {Object} [options={}]
 * @returns {Promise}
 */
Repository.prototype.findById = function findById(id, exclude = true, include = false, options = {}) {
	const opt = merge({
		attributes: { exclude: exclude ? ['created_at', 'updated_at', 'created_by', 'updated_by'] : [] },
	}, options);
	return this.models[this.name].findById(id, opt);
};

/**
 * @function
 * @param {Object} params
 * @param {Transaction} [transaction=null]
 */
Repository.prototype.add = function add(params, transaction = null) {
	return this.models[this.name].create(params, { transaction });
};

/**
 * @function
 * @param exclude
 * @param params
 * @param transaction
 */
Repository.prototype.findOrCreate = function findOrCreate(exclude, params, transaction) {
	let opt = merge({
		attributes: { exclude: exclude ? ['created_at', 'updated_at', 'created_by', 'updated_by'] : [] },
	}, params);
	opt = merge(opt, transaction);
	return this.models[this.name].findOrCreate(opt);
};

/**
 * @function
 * @param {Number} id
 * @param {Object} params
 * @param {Transaction} [transaction=null]
 * @throws The id must be specified
 */
Repository.prototype.modifyById = function modifyById(id, params, transaction = null) {
	if (!id) {
		throw new Errors.MissingRequiredParameterError('The id must be specified');
	}
	return this.models[this.name].findById(id).then((result) => {
		if (!result) {
			return null;
		}
		return result.update(params, { where: { id }, transaction, individualHooks: true });
	});
};

/**
 * @function
 * @param {Number} id
 * @param {Transaction} [transaction=null]
 * @returns {Promise}
 */
Repository.prototype.removeById = function removeById(id, transaction = null) {
	if (!id) {
		throw new Errors.MissingRequiredParameterError('The id must be specified');
	}
	return this.models[this.name].destroy({ where: { id }, transaction });
};

/**
 * @function
 * @returns {Promise}
 */
Repository.prototype.count = function count() {
	return this.models[this.name].count();
};
module.exports = Repository;
