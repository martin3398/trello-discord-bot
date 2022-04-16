import { TrelloReceiver } from "../types";
import { DiscordConfigType } from "../config/config";

class DiscordHandler implements TrelloReceiver {
  constructor(config: DiscordConfigType) {}

  public onEvent(event: string, data: string): void {}
}

export default DiscordHandler;
