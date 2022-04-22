import { TrelloConfigType } from "../config/config";
// @ts-ignore
import Trello from "trello-events";
import StorageHandler from "./storage-handler";

const pollFrequency = 1000 * 60;

class TrelloHandler {
  private storageHandler: StorageHandler;

  private consumers: Array<(args: string) => void>;

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

    this.trello.on("updateCard", (event: unknown, boardId: unknown) => {
      this.consumers.forEach((consumer) => consumer(event as string));
    });
  }

  public register(callback: (arg: string) => void) {
    this.consumers.push(callback);
  }

  public start(): void {
    this.trello.start(pollFrequency, true);
  }
}

export default TrelloHandler;
