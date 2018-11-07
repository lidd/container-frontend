import {Goods} from './Goods';

export class GoodsOrder {
  orderNo?: string;
  goods?: Goods;
  createTime?: number;
  paymentTime?: number;
  paymentMode?: number;
  payment?: number;
  status?: number;
}
