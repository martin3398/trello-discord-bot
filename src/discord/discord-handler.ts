import { DiscordConfigType } from "../config/config";
import { Consumer } from "../pipeline/types";

class DiscordHandler implements Consumer<string> {
  private config: DiscordConfigType;

  constructor(config: DiscordConfigType) {
    this.config = config;
  }

  process(input: string): void {
    console.log(input);
  }
}

export default DiscordHandler;
