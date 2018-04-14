class Command {
	protected _name: string;
	protected _args: boolean;
	protected _aliases: Array<string>;
	protected _usage: string;
	protected _guildOnly: boolean;
	protected _ownerGuildOnly: boolean;
	protected _protected: boolean;
	protected _description: string;
	protected _nonce;
	
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

	public set name(value) {this._name = value;}

	public set args(value) {this._args = value;}

	public set aliases(value) {this._aliases = value;}

	public set usage(value) {this._usage = value;}

	public set guildOnly(value) {this._guildOnly = value;}

	public set ownerGuildOnly(value) {this._ownerGuildOnly = value;}

	public set protected(value) {this._protected = value;}

	public set description(value) {this._description = value;}

	public set nonce(value) {this._nonce = value;}

	public get name() {return this._name;}

	public get args() { return this._args;	}

	public get aliases() {	return this._aliases;}

	public get usage() {return this._usage;}

	public get guildOnly() {return this._guildOnly;}

	public get ownerGuildOnly() {return this._ownerGuildOnly;}

	public get protected() {return this._protected;}

	public get description() {return this._description;}

	public get nonce() {return this._nonce;}

	public async execute(message, args): Promise<any> {
		throw new Error('You must implement the execute function');
	}

	public async reactionHandler(reaction, user): Promise<any> {
		throw new Error('You must implement the reactionHandler function');
	}
}

export default Command;

