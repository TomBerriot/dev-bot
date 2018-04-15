/* eslint-disable global-require,no-multi-assign */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');

/**
 * @namespace Management:Manager
 */
const internals = {
  sequelize: null,
  repositories: {},
  models: {},
};
/**
 * @module DataManager/Management/Manager
 */
exports = module.exports = {
  /**
   * @function
   * @description Setup the manager
   * @throws Missing parameters to initialize sequelize
   * @param {String} database
   * @param {String} username
   * @param {String} [password]
   * @param {Object} [options={}] An object with options.
   * @param {String} [options.host='localhost'] The host of the relational database.
   * @param {Integer} [options.port=] The port of the relational database.
   * @param {String} [options.dialect='mysql'] The database's dialect
   * @param {Function} [options.logging=console.log]
   */
  setup: function setup(database, username, password, options = {}) {
    const modelsPath = path.join(__dirname, 'Models');
    internals.sequelize = new Sequelize(database, username, password, options);
    /* Load models */
    fs.readdirSync(modelsPath).filter(file => (file.indexOf('.') !== 0)).forEach((name) => {
      const model = internals.sequelize.import(path.join(modelsPath, name));
      internals.models[model.name] = model;

    });

    Object.keys(internals.models).forEach((modelName) => {
      if ('associate' in internals.models[modelName]) {
        internals.models[modelName].associate(internals.models);
      }
    });

    /* Load repositories */
    const repositoriesPath = path.join(__dirname, 'Repository');
    fs.readdirSync(repositoriesPath).forEach((file) => {
      const stat = fs.lstatSync(`${repositoriesPath}/${file}`);
      if (stat.isFile()) {
        const repository = new (require(`./Repository/${file}`))(internals.models);
        internals.repositories[repository.Name] = repository;

      }
    });
  },
  /**
   *
   * @function
   * @param {string} name
   * @returns {Repository}
   * @description Get the repository
   * @throws This repository doesn't exists
   * @throws You must call setup before use this function
   */
  get: function get(name) {
    if (!internals.sequelize) throw new Error('You must call setup before use this function');
    const repository = internals.repositories[name];
    if (typeof repository !== 'undefined') {
      return repository;
    }
    throw Error(`The repository "${name}" doesn't exists`);
  },
  /**
   * @function
   * @param {Object} options
   * @returns {Promise}
   * @description Synchronize database with the model (create tables if not exists)
   * @throws You must call setup before use this function
   */
  sync: function sync(options = {}) {
    if (!internals.sequelize) throw new Error('You must call setup before use this function');
    return internals.sequelize.sync(options);
  },
  /**
   * @function
   * @param {Function} callback
   * @returns {Promise}
   * @description Create a transaction
   * @throws You must call setup before use this function
   */
  transaction: function transaction(callback) {
    if (!internals.sequelize) throw new Error('You must call setup before use this function');
    return internals.sequelize.transaction(callback);
  },

  /**
   * @function
   * @returns {Promise}
   * @description Test the connection by trying to authenticate
   * @throws You must call setup before use this function
   */
  authenticate: function authenticate() {
    if (!internals.sequelize) throw new Error('You must call setup before use this function');
    return internals.sequelize.authenticate();
  },

  all: function all(promises) {
    return Sequelize.Promise.all(promises);
  },
};
