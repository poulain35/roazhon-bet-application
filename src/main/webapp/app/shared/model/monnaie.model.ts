import { IUser } from 'app/core/user/user.model';

export interface IMonnaie {
  id?: string;
  total?: number;
  userId?: IUser;
}

export class Monnaie implements IMonnaie {
  constructor(public id?: string, public total?: number, public userId?: IUser) {}
}
