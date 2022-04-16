export interface TrelloReceiver {
  onEvent: (event: string, data: string) => void;
}
