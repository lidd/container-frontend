import {User} from './User';
import {Goods} from './Goods';
import {Merchant} from './Merchant';

export class VendingMachine {

  id?: number;

  serial?: string;

  location?: string;

  status?: number;

  updateTime?: number;

  temperature?: number;

  goods?: Array<Goods>;

  master?: User;

  merchant?: Merchant;
}
