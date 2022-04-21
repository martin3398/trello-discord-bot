import { Middleware } from "../pipeline/types";

class CardMiddleware implements Middleware<unknown, string> {
  transform(payload: unknown): string {
    return "abc";
  }
}

export default CardMiddleware;
