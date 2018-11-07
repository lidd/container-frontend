import {Component, OnInit} from '@angular/core';
import {GoodsOrder} from '../model/GoodsOrder';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsService} from '../shared/goods.service';
import {Page} from '../model/Page';

@Component({
  selector: 'app-goods-order-table',
  templateUrl: './goods-order-table.component.html',
  styleUrls: ['./goods-order-table.component.css']
})
export class GoodsOrderTableComponent implements OnInit {


  goodsOrderList: GoodsOrder[] = [];

  pageIndex: number = 1;
  pageSize: number = 10;
  totalElements: number;

  constructor(private modalService: NzModalService, private refreshEmitter: RefreshEmitterService,
              private goodsService: GoodsService, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.getOrderPage(this.pageIndex, this.pageSize);
  }

  private getOrderPage(pageIndex: number, pageSize: number) {
    this.goodsService.getOrderPage(pageIndex, pageSize).subscribe(res => {
      if (res.code == 1000) {
        let page: Page = <Page>res.data;
        this.goodsOrderList = page.content;
        this.pageIndex = page.number + 1;
        this.pageSize = page.size;
        this.totalElements = page.totalElements;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  pageIndexChange() {
    this.getOrderPage(this.pageIndex, this.pageSize);
  };

}
