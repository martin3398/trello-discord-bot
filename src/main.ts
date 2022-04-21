import { parseConfig } from "./config/config";
import TrelloHandler from "./trello/trello-handler";
import CardMiddleware from "./middleware/card-middleware";
import DiscordHandler from "./discord/discord-handler";
import { createPipeline } from "./pipeline/pipeline";
import StorageHandler from "./trello/storage-handler";

const config = parseConfig();

const pipeline = createPipeline<string>()
  .addHandler(new CardMiddleware())
  .addConsumer(new DiscordHandler(config.discord));

const trelloHandler = new TrelloHandler(config.trello, new StorageHandler());
trelloHandler.register(pipeline.execute.bind(pipeline));

trelloHandler.start();
