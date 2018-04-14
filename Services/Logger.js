var logger = require('winston');

const Logger = function Logger() {
    // Configure logger settings
    this.logger = logger;
    this.logger.remove(logger.transports.Console);
    this.logger.add(logger.transports.Console, {
        colorize: true
    });

    this.logger.level = 'debug';

};

Logger.prototype.getLogger = function getLogger() {
    return this.logger;
};

var LoggerManager = (function () {
    var instance;

    function createInstance() {
        var logger = new Logger();
        return logger;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = LoggerManager;
