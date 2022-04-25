import { Consumer, Handler } from "./types";

class Pipeline<I, O> {
  private currentHandler: Handler<I, O>;

  constructor(currentHandler: Handler<I, O>) {
    this.currentHandler = currentHandler;
  }

  public addHandler<K>(nextHandler: Handler<O, K>): Pipeline<I, K> {
    return new Pipeline<I, K>(
      new FunctionHandler((input: I) => {
        const intermediate = this.currentHandler.process(input);
        return intermediate === undefined
          ? undefined
          : nextHandler.process(intermediate);
      })
    );
  }

  public addConsumer(nextHandler: Consumer<O>) {
    return this.addHandler(nextHandler);
  }

  public execute(input: I): O | undefined {
    return this.currentHandler.process(input);
  }
}

class FunctionHandler<I, O> implements Handler<I, O> {
  private readonly fn: (input: I) => O | undefined;

  constructor(fn: (input: I) => O | undefined) {
    this.fn = fn;
  }

  public process(input: I): O | undefined {
    return this.fn(input);
  }
}

const createPipeline = <I>() => {
  return new Pipeline<I, I>(new FunctionHandler<I, I>((e) => e));
};

export { createPipeline };
