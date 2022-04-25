import { TrelloConfigType } from "../config/config";
// @ts-ignore
import Trello from "trello-events";
import StorageHandler from "./storage-handler";
import { UnverifiedEvent } from "./types";

const pollFrequency = 1000 * 60;

class TrelloHandler {
  private storageHandler: StorageHandler;

  private consumers: Array<(args: UnverifiedEvent) => void>;

  private trello: Trello;

  constructor(config: TrelloConfigType, storageHandler: StorageHandler) {
    this.storageHandler = storageHandler;

    this.consumers = [];

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

    this.trello.on("updateCard", (event: UnverifiedEvent, boardId: string) => {
      this.consumers.forEach((consumer) => consumer(event));
    });
  }

  public register(callback: (arg: UnverifiedEvent) => void) {
    this.consumers.push(callback);
  }

  public start(): void {
    this.trello.start(pollFrequency, true);
  }
}

export default TrelloHandler;
