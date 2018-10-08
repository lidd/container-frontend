import {Role} from './Role';

export class User {
  id: number;

  name: string;

  phone?: string;

  roles?: Array<Role>;

}
