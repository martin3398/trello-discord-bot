import { parseConfig } from "./config/config";
import TrelloHandler from "./trello/trello-handler";
import StorageHandler from "./trello/storage-handler";

const config = parseConfig();

const trelloHandler = new TrelloHandler(config.trello, new StorageHandler());

trelloHandler.start();

console.log("Started");
