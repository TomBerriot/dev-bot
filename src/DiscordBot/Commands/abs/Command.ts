class Command {
  public name: string;
  public args: boolean;
  public aliases: string[];
  public usage: string;
  public guildOnly: boolean;
  public ownerGuildOnly: boolean;
  public protected: boolean;
  public description: string;
  public nonce: number | undefined;

  constructor() {
    this.name = '';
    this.args = false;
    this.aliases = [];
    this.usage = '';
    this.guildOnly = false;
    this.ownerGuildOnly = false;
    this.protected = false;
    this.description = '';
    this.nonce = undefined;
  }

  public async execute(message, args): Promise<any> {
    throw new Error('You must implement the execute function');
  }

  public async reactionHandler(reaction, user): Promise<any> {
    throw new Error('You must implement the reactionHandler function');
  }
}

export default Command;
