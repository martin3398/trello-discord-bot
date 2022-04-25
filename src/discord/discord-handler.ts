import { DiscordConfigType } from "../config/config";
import { Consumer } from "../pipeline/types";
import { Client, Intents, TextChannel } from "discord.js";

class DiscordHandler implements Consumer<string> {
  private client: Client;

  private config: DiscordConfigType;

  constructor(config: DiscordConfigType) {
    this.config = config;
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  }

  public async init(): Promise<DiscordHandler> {
    try {
      await this.client.login(this.config.token);
      await this.client.guilds.fetch(this.config.serverId);
      await this.client.channels.fetch(this.config.channelId);
    } catch (e) {
      throw new Error("Cannot initalize Discord");
    }
    return this;
  }

  public process(input: string): void {
    const channel = this.client.channels.cache.get(this.config.channelId);

    if (!(channel instanceof TextChannel)) {
      throw new Error("Channel has wrong type");
    }

    channel.send(input).catch(() => {
      throw new Error("Cannot send message to Discord");
    });
  }
}

export default DiscordHandler;
