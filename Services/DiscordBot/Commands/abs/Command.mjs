class Command {
	constructor() {
		this._name = '';
		this._args = false;
		this._aliases = [];
		this._usage = '';
		this._guildOnly = false;
		this._ownerGuildOnly = false;
		this._protected = false;
		this._description = '';
		this._nonce = undefined;
	}

	set name(value) {this._name = value;}

	set args(value) {this._args = value;}

	set aliases(value) {this._aliases = value;}

	set usage(value) {this._usage = value;}

	set guildOnly(value) {this._guildOnly = value;}

	set ownerGuildOnly(value) {this._ownerGuildOnly = value;}

	set protected(value) {this._protected = value;}

	set description(value) {this._description = value;}

	set nonce(value) {this._nonce = value;}

	get name() {return this._name;}

	get args() { return this._args;	}

	get aliases() {	return this._aliases;}

	get usage() {return this._usage;}

	get guildOnly() {return this._guildOnly;}

	get ownerGuildOnly() {return this._ownerGuildOnly;}

	get protected() {return this._protected;}

	get description() {return this._description;}

	get nonce() {return this._nonce;}

	async execute() {
		throw new Error('You must implement the execute function');
	}

	async reactionHandler() {
		throw new Error('You must implement the reactionHandler function');
	}
}

export default Command;

