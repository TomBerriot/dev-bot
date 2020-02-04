import ConsoleStrategy from './ConsoleStrategy';
import FileStrategy from './FileStrategy';

/**
 * @description Enum for logger strategy
 * @readonly
 * @enum {number}
 */
export const StrategyEnum = {
  CONSOLE: 'console',
  FILE: 'file',
};

/**
 * @module StrategyFactory
 * @description The logger strategy factory
 */
export function create(type, name, level, options = {} as any) {
  switch (type) {
    case StrategyEnum.CONSOLE: {
      return new ConsoleStrategy(level, name, options);
    }
    case StrategyEnum.FILE: {
      return new FileStrategy(level, name, options);
    }
    default: {
      throw new Error('Invalid strategy type');
    }
  }
}
