import { parseConfig } from "./config/config";
import DiscordHandler from "./discord/discord-handler";
import TrelloHandler from "./trello/trello-handler";
import StorageHandler from "./trello/storage-handler";

const config = parseConfig();

const trelloHandler = new TrelloHandler(config.trello, new StorageHandler());
trelloHandler.register(new DiscordHandler(config.discord));

trelloHandler.start();
