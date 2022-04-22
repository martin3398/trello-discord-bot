import { Handler } from "../pipeline/types";
import { Action } from "../trello/actions";

class ActionMiddleware implements Handler<string, Action> {
  process(input: string): Action {
    return new Action(input);
  }
}

export default ActionMiddleware;
