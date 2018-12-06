import {Component, OnInit} from '@angular/core';
import {GoodsOrder} from '../model/GoodsOrder';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsService} from '../shared/goods.service';
import {Page} from '../model/Page';
import zh from '@angular/common/locales/zh';
import {registerLocaleData} from '@angular/common';
import {VendingMachineService} from '../shared/vending-machine.service';
import {MerchantService} from '../shared/merchant.service';

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
  merchantId: number;
  machineSerial: number;
  machineList = [];
  selectedMachine;
  merchantList = [];
  selectedMerchant;
  dateRange: Array<Date>;
  totalProfit: any;

  constructor(private modalService: NzModalService, private refreshEmitter: RefreshEmitterService,
              private goodsService: GoodsService, private notification: NzNotificationService,
              private machineService: VendingMachineService, private merchantService: MerchantService) {
  }

  ngOnInit() {
    registerLocaleData(zh);
    let params = {page: this.pageIndex.toString(), size: this.pageSize.toString()};
    this.getOrderPage(params);
    this.initMachineList();
    this.initMerchantList();
  }

  private getOrderPage(params: object) {
    this.goodsService.getOrderPage(params).subscribe(res => {
      if (res.code == 1000) {
        this.totalProfit = parseInt(res.msg) * 0.01;
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
    let params = {page: this.pageIndex.toString(), size: this.pageSize.toString()};
    this.getOrderPage(params);
  };


  search() {
    let params: any = {};
    params.page = this.pageIndex.toString();
    params.size = this.pageSize.toString();
    if (this.dateRange) {
      params.from = this.dateRange[0].getTime().toString();
      params.to = this.dateRange[1].getTime().toString();
    }
    if (this.selectedMachine) {
      params.machineSerial = this.selectedMachine.toString();
    }
    if (this.selectedMerchant) {
      params.merchantId = this.selectedMerchant.toString();
    }
    this.getOrderPage(params);
  }

  initMachineList() {
    this.machineService.getMachines().subscribe(res => {
      if (res.code === 1000) {
        this.machineList = <Array<any>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  initMerchantList() {
    this.merchantService.getMerchantList().subscribe(res => {
      if (res.code === 1000) {
        this.merchantList = <Array<any>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }
}
