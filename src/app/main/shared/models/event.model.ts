import {User} from './user.model';

export class MishEvent {
  constructor(
    public title: string,
    public holiday: string,
    public address: object,
    public confession: string,
    public dateFrom: string,
    public dateTo: string,
    public food: any,
    public description: string,
    public owner: User,
    public id?: number
  ) {
  }
}

