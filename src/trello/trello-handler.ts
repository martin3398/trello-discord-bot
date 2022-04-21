import { TrelloConfigType } from "../config/config";
// @ts-ignore
import Trello from "trello-events";
import StorageHandler from "./storage-handler";
import { Producer } from "../pipeline/types";

const pollFrequency = 1000 * 60;

class TrelloHandler implements Producer<unknown> {
  private storageHandler: StorageHandler;

  private trello: Trello;

  private callbacks = [] as ((arg: unknown) => void)[];

  constructor(config: TrelloConfigType, storageHandler: StorageHandler) {
    this.storageHandler = storageHandler;

    this.trello = new Trello({
      pollFrequency,
      minId: 0,
      start: false,
      trello: {
        boards: config.boards,
        key: config.key,
        token: config.token,
      },
    });
  }

  public start(): void {
    this.trello.start(pollFrequency, true);
    this.trello.on("updateCard", (e: unknown) =>
      this.callbacks.forEach((fn) => fn(e))
    );
  }

  public register(callback: (arg: unknown) => void): void {
    this.callbacks.push(callback);
  }
}

export default TrelloHandler;
