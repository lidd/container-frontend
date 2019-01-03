import {Component, OnInit} from '@angular/core';
import {Goods} from '../model/Goods';
import {ModalOptionsForService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Cmd} from '../model/Cmd';
import {AddGoodsFormComponent} from '../add-goods-form/add-goods-form.component';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsService} from '../shared/goods.service';
import {Page} from '../model/Page';
import {UserService} from '../shared/user.service';
import {VendingMachineService} from '../shared/vending-machine.service';
import {GoodsDescription} from '../model/GoodsDescription';
import {VendingMachine} from '../model/VendingMachine';
import zh from '@angular/common/locales/zh';
import {registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.css']
})
export class GoodsTableComponent implements OnInit {

  goodsList: Goods[] = [];

  totalElements: number;
  isVisible = false;
  userList = [];
  machineList = [];
  selectedMan;
  deliverymanDisable = false;
  allChecked = false;
  indeterminate = false;
  selectedMachine;
  goodsFilter: Array<GoodsDescription> = [];
  goodsStatusFilter: Array<{text:string, value:number}> = [
    {text: '待配送', value: 3000},
    {text: '配送中', value: 4000},
    {text: '售卖中', value: 5000},
    {text: '已售出', value: 6000},
    {text: '已回收', value: 7000}
  ];
  machineFilters: Array<VendingMachine> = [];

  queryDto = {
    page: '1',
    size: '10',
    goodsDescriptionId: '',
    goodsStatus: '',
    machineSerial: '',
    createTime: ''
  };

  constructor(private modalService: NzModalService, private refreshEmitter: RefreshEmitterService,
              private goodsService: GoodsService, private notification: NzNotificationService,
              private userService: UserService, private machineService: VendingMachineService) {

  }

  ngOnInit() {
    registerLocaleData(zh);
    this.initGoodsFilters();
    this.initMachineFilters();
    this.getGoodsPage();
  }

  initMachineFilters() {
    this.machineService.getMachines().subscribe(res => {
      if (res.code == 1000) {
        this.machineFilters = <Array<VendingMachine>>res.data;
      }
    });
  }

  initGoodsFilters() {
    this.goodsService.getGoodsDescList().subscribe(res => {
      if (res.code == 1000) {
        this.goodsFilter = <Array<GoodsDescription>>res.data;

      }
    });
  }

  addGoodsModal() {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '添加商品',
      nzContent: AddGoodsFormComponent,
      nzFooter: null
    };
    let modalRef = this.modalService.create(option);
    this.refreshEmitter.subscribe(e => {
      if (e.name == Cmd.close_goods_add_form) {
        modalRef.destroy();
      }
      if (e.name == Cmd.refresh_goods_table) {
        this.getGoodsPage();
      }
    });
  }

  getGoodsPage() {
    this.goodsService.getGoodsPage(this.queryDto).subscribe(res => {
      if (res.code == 1000) {
        let page: Page = <Page>res.data;
        this.goodsList = page.content;
        this.queryDto.page = (page.number + 1).toString();
        this.queryDto.size = page.size.toString();
        this.totalElements = page.totalElements;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  setDeliverymanModal() {
    this.isVisible = true;
    this.userService.getUserList().subscribe(res => {
      if (res.code === 1000) {
        this.userList = <Array<any>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
    this.machineService.getMachines().subscribe(res => {
      if (res.code === 1000) {
        this.machineList = <Array<any>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  pageIndexChange() {
    this.getGoodsPage();
  };

  handleOk() {
    if (this.selectedMan) {
      this.goodsService.saveDeliveryman(this.selectedMan, this.selectedMachine, this.goodsList.filter(e => e.checked === true).map(e => e.id))
        .subscribe(res => {
          if (res.code === 1000) {
            this.notification.success('成功', '设置成功');
          } else {
            this.notification.error('错误', `${res.code}: ${res.msg}`);
          }
          this.isVisible = false;
          this.getGoodsPage();
          this.refreshCheckStatus();
        });
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  refreshCheckStatus() {
    const allChecked = this.goodsList.every(value => value.checked === true);
    const allUnChecked = this.goodsList.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.deliverymanDisable = allChecked || this.indeterminate;
  }

  checkAll(value: boolean): void {
    this.goodsList.forEach(data => {
      data.checked = value;
    });
    this.refreshCheckStatus();
  }
}
