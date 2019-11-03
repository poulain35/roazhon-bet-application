export interface ICustomUser {
  id?: number;
  telephone?: string;
}

export class CustomUser implements ICustomUser {
  constructor(public id?: number, public telephone?: string) {}
}
