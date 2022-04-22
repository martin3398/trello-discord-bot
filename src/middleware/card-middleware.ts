import { Handler } from "../pipeline/types";
import { Action } from "../trello/actions";

class CardMiddleware implements Handler<Action, string> {
  process(input: Action): string {
    console.log(input.getActionObject().data);
    return "test";
  }
}

export default CardMiddleware;
