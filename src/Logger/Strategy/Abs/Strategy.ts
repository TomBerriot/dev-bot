export default class Strategy {
    protected options;
    protected transport;

    constructor(level, name, options = {} as any) {
        this.options = options;
        this.options.level = !level ? 'info' : level;

        if (!options.handleExceptions) {
            this.options.handleExceptions = true;
        }

        if (!options.humanReadableUnhandledException) {
            this.options.humanReadableUnhandledException = true;
        }

        if (!options.json) {
            this.options.json = false;
        }

        if (!options.dateFormat) {
            options.dateFormat = 'ISO';
        }

        switch (options.dateFormat) {
            case 'UTC': {
                this.options.timestamp = () => new Date().toUTCString();

                break;
            }
            default:
            case 'ISO': {
                this.options.timestamp = () => new Date().toISOString();
                break;
            }
        }

        this.options.name = name;
        this.transport = {};
    }

    public register(logger) {
        logger.add(this.transport, this.options);
    }
}
