import { parseConfig } from "./config/config";
import DiscordHandler from "./discord/discord-handler";
import TrelloHandler from "./trello/trello-handler";
import Pipeline from "./pipeline/pipeline";
import StorageHandler from "./trello/storage-handler";
import CardMiddleware from "./middleware/card-middleware";

const config = parseConfig();

const pipeline = new Pipeline();

pipeline.setProducer(new TrelloHandler(config.trello, new StorageHandler()));
pipeline.addMiddleware(new CardMiddleware());
pipeline.addConsumer(new DiscordHandler(config.discord));

pipeline.start();
