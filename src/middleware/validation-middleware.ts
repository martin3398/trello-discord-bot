import { Handler } from "../pipeline/types";
import {
  UnverifiedEvent,
  UpdateCardEvent,
  updateCardEventSchema,
} from "../trello/types";

class ValidationMiddleware
  implements Handler<UnverifiedEvent, UpdateCardEvent>
{
  process(input: UnverifiedEvent): UpdateCardEvent | undefined {
    try {
      updateCardEventSchema.validateSync(input);
      return input as UpdateCardEvent;
    } catch (e) {
      return undefined;
    }
  }
}

export default ValidationMiddleware;
