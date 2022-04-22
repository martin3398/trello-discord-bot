class StorageHandler {
  private maxId: number;

  constructor() {
    this.maxId = Infinity;
  }

  public getMaxId(): number {
    return this.maxId;
  }

  public setMaxId(maxId: number): void {
    this.maxId = maxId;
  }
}

export default StorageHandler;
