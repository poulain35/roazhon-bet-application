import { Moment } from 'moment';

export interface IMatch {
  id?: number;
  domicile?: string;
  exterieur?: string;
  date?: Moment;
}

export class Match implements IMatch {
  constructor(public id?: number, public domicile?: string, public exterieur?: string, public date?: Moment) {}
}
