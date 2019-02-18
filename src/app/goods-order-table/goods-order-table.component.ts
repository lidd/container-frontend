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
import {GoodsDescription} from '../model/GoodsDescription';

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
  selectedGoodsDesc: GoodsDescription;
  machineList = [];
  selectedMachine;
  goodsDescList: Array<GoodsDescription>;
  merchantList = [];
  selectedMerchant;
  dateRange: Array<Date>;
  totalProfit: any;
  params: any = {page: 1, size: 10};

  constructor(private modalService: NzModalService, private refreshEmitter: RefreshEmitterService,
              private goodsService: GoodsService, private notification: NzNotificationService,
              private machineService: VendingMachineService, private merchantService: MerchantService) {
  }

  ngOnInit() {
    registerLocaleData(zh);
    this.getOrderPage();
    this.initMachineList();
    this.initMerchantList();
    this.initGoodsDescList();
  }

  private getOrderPage() {
    this.goodsService.getOrderPage(this.params).subscribe(res => {
      if (res.code == 1000) {
        this.totalProfit = parseInt(res.msg) * 0.01;
        let page: Page = <Page>res.data;
        this.goodsOrderList = page.content;
        this.params.page = page.number + 1;
        this.params.size = page.size;
        this.totalElements = page.totalElements;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  pageIndexChange() {
    this.getOrderPage();
  };


  search() {
    if (this.dateRange) {
      this.params.from = this.dateRange[0].getTime().toString();
      this.params.to = this.dateRange[1].getTime().toString();
    }
    if (this.selectedMachine) {
      this.params.machineSerial = this.selectedMachine.toString();
    }
    if (this.selectedMerchant) {
      this.params.merchantId = this.selectedMerchant.toString();
    }
    if (this.selectedGoodsDesc) {
      this.params.goodsDescId = this.selectedGoodsDesc.id;
    }

    this.getOrderPage();
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

  private initGoodsDescList() {
    this.goodsService.getGoodsDescList().subscribe(res => {
      if (res.code == 1000) {
        this.goodsDescList = <Array<GoodsDescription>>res.data;
      }
    });
  }
}
