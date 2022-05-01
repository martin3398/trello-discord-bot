import { Handler } from '../pipeline/types';

class CardMiddleware implements Handler<string, string> {
  process(input: string): string {
    return input;
  }
}

export default CardMiddleware;
