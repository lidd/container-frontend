import { Component, OnInit } from '@angular/core';
import {Goods} from '../model/Goods';

@Component({
  selector: 'app-goods-order-table',
  templateUrl: './goods-order-table.component.html',
  styleUrls: ['./goods-order-table.component.css']
})
export class GoodsOrderTableComponent implements OnInit {


  goodsList:Goods[] = [];

  constructor() { }

  ngOnInit() {
  }

  addGoodsModal() {
  }
}
