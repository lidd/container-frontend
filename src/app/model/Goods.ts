import {GoodsDescription} from './GoodsDescription';
import {User} from './User';
import {VendingMachine} from './VendingMachine';

export class Goods {

  id?: number;

  createTime: number;

  status: number;

  comment: string;

  batchNo: string;

  goodsDescription: GoodsDescription;

  checked?: boolean;

  deliveryman?:User;

  vendingMachine?:VendingMachine;
}
