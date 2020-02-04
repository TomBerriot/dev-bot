import winston from 'winston';
import config from '../config';
import { create } from './Strategy/StrategyFactory';

class Logger {
  private options;
  private winstonLogger;

  constructor(options = {} as any) {
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

  public add(strategy) {
    strategy.register(this.winstonLogger);
  }

  public emergency(message: string) {
    this.winstonLogger.emergency(message);
  }

  public alert(message: string) {
    this.winstonLogger.alert(message);
  }

  public critical(message: string) {
    this.winstonLogger.critical(message);
  }

  public error(message: string) {
    this.winstonLogger.error(message);
  }

  public warning(message: string) {
    this.winstonLogger.warning(message);
  }

  public notice(message: string) {
    this.winstonLogger.notice(message);
  }

  public info(message: string) {
    this.winstonLogger.info(message);
  }

  public debug(message: string) {
    this.winstonLogger.debug(message);
  }
}

const logger = new Logger(config.logger.options);
config.logger.strategies.forEach(strategy => {
  const strat = create(
    strategy.type,
    strategy.name,
    strategy.level,
    strategy.options
  );
  logger.add(strat);
});

export default logger;
