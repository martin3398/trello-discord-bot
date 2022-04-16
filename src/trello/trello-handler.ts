import { TrelloReceiver } from "../types";
import { TrelloConfigType } from "../config/config";
// @ts-ignore
import Trello from "trello-events";
import StorageHandler from "./storage-handler";

const pollFrequency = 1000 * 60;

class TrelloHandler {
  private storageHandler: StorageHandler;

  private receivers: TrelloReceiver[];
  private trello: Trello;

  constructor(config: TrelloConfigType, storageHandler: StorageHandler) {
    this.storageHandler = storageHandler;
    this.receivers = [];

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

  public register(receiver: TrelloReceiver): void {
    this.receivers.push(receiver);
  }

  public start(): void {
    this.trello.start(pollFrequency, true);
  }
}

export default TrelloHandler;
