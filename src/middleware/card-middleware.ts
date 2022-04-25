import { Handler } from "../pipeline/types";
import { UpdateCardEvent } from "../trello/types";

class CardMiddleware implements Handler<UpdateCardEvent, string> {
  process(input: UpdateCardEvent): string {
    return `Moved '${input.data.card.name} from '${input.data.listBefore.name}' to '${input.data.listAfter.name}'`;
  }
}

export default CardMiddleware;
