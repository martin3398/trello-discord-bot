import { Consumer } from "../pipeline/types";
import { DiscordConfigType } from "../config/config";

class DiscordHandler implements Consumer<string> {
  private config: DiscordConfigType;

  constructor(config: DiscordConfigType) {
    this.config = config;
  }

  consume(payload: string): void {
    console.log(payload);
  }
}

export default DiscordHandler;
