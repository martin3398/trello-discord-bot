export class Action {
  private readonly actionObject: ActionObject;

  constructor(event: any) {
    this.actionObject = {
      id: event.id,
      idMemberCreator: event.idMemberCreator,
      data: event.data,
      date: new Date(event.date),
      type: event.type,
    };
  }

  public getActionObject(): ActionObject {
    return this.actionObject;
  }
}

export interface ActionObject {
  id: string;
  idMemberCreator: string;
  data: {
    list?: ActionDataContent;
    listBefore?: ActionDataContent;
    listAfter?: ActionDataContent;
    board?: ActionDataContent;
    old?: ActionDataContent;
    test?: ActionDataContent;
  };
  date: Date;
  type: ActionTypeEnum;
}

interface ActionDataContent {
  idList?: string;
  id?: string;
  idShort?: number;
  name?: string;
  due?: Date;
}
export enum ActionTypeEnum {
  UpdateCard = "updateCard",
}
