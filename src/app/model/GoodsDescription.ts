import {Merchant} from './Merchant';

export class GoodsDescription {
  id:number;
  description?:string;
  imageHash?:string;
  price?:number;
  barcode?:string;
  merchant?:Merchant;
}
