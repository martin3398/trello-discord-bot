import { TrelloConfigType } from "../config/config";
import { Producer } from "../types";
// @ts-ignore
import Trello from "trello-events";
import StorageHandler from "./storage-handler";

const pollFrequency = 1000 * 60;

class TrelloHandler implements Producer<unknown> {
  private storageHandler: StorageHandler;

  private consumers: Array<(args: unknown) => void>;

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

    this.trello.on(
      "updateCard",
      function (event: unknown, boardId: unknown) {}
    );
  }

  public register(callback: (arg: unknown) => void) {
    this.consumers.push(callback);
  }

  public start(): void {
    this.trello.start(pollFrequency, true);
  }
}

export default TrelloHandler;
