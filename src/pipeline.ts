import { Consumer, Middleware, Producer } from "./types";

class Pipeline {
  private producer: Producer<unknown>;
  private middlewares = [] as Middleware<unknown, unknown>[];
  private consumers = [] as Consumer<unknown>[];

  public setProducer(producer: Producer<unknown>): void {
    this.producer = producer;
  }

  public addMiddleware(middleware: Middleware<unknown, unknown>): void {
    this.middlewares.push(middleware);
  }

  public addConsumer(consumer: Consumer<unknown>): void {
    this.consumers.push(consumer);
  }

  public start(): void {
    this.producer.start();
  }
}

export default Pipeline;
