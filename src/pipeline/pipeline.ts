import { Consumer, Middleware, Producer } from "./types";

class Pipeline {
  private producer: Producer<any> | undefined;
  private middlewares = [] as Middleware<any, any>[];
  private consumers = [] as Consumer<any>[];

  public setProducer(producer: Producer<any>): void {
    this.producer = producer;
    this.producer.register((e) => this.handle(e));
  }

  public addMiddleware(middleware: Middleware<any, any>): void {
    this.middlewares.push(middleware);
  }

  public addConsumer(consumer: Consumer<any>): void {
    this.consumers.push(consumer);
  }

  public start(): void {
    if (!this.producer) {
      throw new Error("producer not initalized");
    }
    this.producer.start();
  }

  private handle(input: any): void {
    let content = input;
    this.middlewares.forEach((middleware) => {
      content = middleware.transform(content);
    });

    this.consumers.forEach((consumer) => {
      consumer.consume(content);
    });
  }
}

export default Pipeline;
