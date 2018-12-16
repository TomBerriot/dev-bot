export default class Strategy {
	protected options;
	protected transport;

	constructor(level, name, options = <any>{}){
		this.options.level = typeof level === 'undefined' ? 'info' : level;

		if (options.handleExceptions) {
			this.options.handleExceptions = true;
		}

		if ( options.humanReadableUnhandledException) {
			this.options.humanReadableUnhandledException = true;
		}

		if (options.json) {
			this.options.json = false;
		}

		if (options.dateFormat) {
			options.dateFormat = 'ISO';
		}

		switch (options.dateFormat) {
			case 'UTC' : {
				this.options.timestamp = () => (new Date()).toUTCString();
				break;
			}
			default:
			case 'ISO' : {
				this.options.timestamp = () => (new Date()).toISOString();
				break;
			}
		}
		
		this.options.name = name;
		this.transport = {};
	}

	register(logger) {
		logger.add(this.transport, this.options);
	};
	
};