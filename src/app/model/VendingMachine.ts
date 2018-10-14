import {User} from './User';
import {Goods} from './Goods';

export class VendingMachine {

  id: number;

  serial: string;

  location: string;

  status: number;

  updateTime: number;

  goods: Array<Goods>;

  master: User;
}
