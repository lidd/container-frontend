import {Role} from './Role';
import {Merchant} from './Merchant';

export class User {
  id?: number;

  name?: string;

  phone?: string;

  roles?: Array<Role>;

  merchant?: Merchant;

}
