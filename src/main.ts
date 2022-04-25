import { parseConfig } from "./config/config";
import TrelloHandler from "./trello/trello-handler";
import CardMiddleware from "./middleware/card-middleware";
import { createPipeline } from "./pipeline/pipeline";
import StorageHandler from "./trello/storage-handler";
import DiscordHandler from "./discord/discord-handler";
import ValidationMiddleware from "./middleware/validation-middleware";
import { UnverifiedEvent } from "./trello/types";

(async function () {
  const config = parseConfig();

  const pipeline = createPipeline<UnverifiedEvent>()
    .addHandler(new ValidationMiddleware())
    .addHandler(new CardMiddleware())
    .addConsumer(await new DiscordHandler(config.discord).init());

  const trelloHandler = new TrelloHandler(config.trello, new StorageHandler());
  trelloHandler.register(pipeline.execute.bind(pipeline));

  trelloHandler.start();
})();
