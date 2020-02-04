/* eslint-disable no-param-reassign */
import appRootPath from 'app-root-path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import Strategy from './Abs/Strategy';

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
export default class FileStrategy extends Strategy {
  constructor(level, name, options = {} as any) {
    super(level, name, options);

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

    this.options.formatter = opt =>
      `${opt.timestamp()} [${opt.level.toUpperCase()}] ${
        !opt.message ? opt.message : ''
      }${
        opt.meta && Object.keys(opt.meta).length
          ? `\n\t${JSON.stringify(opt.meta)}`
          : ''
      }`;

    this.transport = WinstonDailyRotateFile;
  }
}
