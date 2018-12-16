import winston from 'winston';
import config from '../config';
import {create} from './Strategy/StrategyFactory';

class Logger {

	private options;
	private winstonLogger;

	constructor(options = <any>{}){
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
	}

	add(strategy) {
		strategy.register(this.winstonLogger);
	}

	emergency(message: string) {
		this.winstonLogger.emergency(message);
	};

	alert(message: string) {
		this.winstonLogger.alert(message);
	};

	critical(message: string) {
		this.winstonLogger.critical(message);
	};

	error(message: string) {
		this.winstonLogger.error(message);
	};

	warning(message: string) {
		this.winstonLogger.warning(message);
	};

	notice(message: string) {
		this.winstonLogger.notice(message);
	};

	info(message: string) {
		this.winstonLogger.info(message);
	};

	debug(message: string) {
		this.winstonLogger.debug(message);
	};
}

let logger = new Logger(config.logger.options);
config.logger.strategies.forEach((strategy) => {
	
	let strat = create(strategy.type, strategy.name, strategy.level, strategy.options);
	console.log(strat)
	logger.add(strat);
	
	
});

export default logger;