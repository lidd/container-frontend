import {Component, OnInit} from '@angular/core';
import {ModalOptionsForService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {AddGoodsFormComponent} from '../add-goods-form/add-goods-form.component';
import {Cmd} from '../model/Cmd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsService} from '../shared/goods.service';
import {UserService} from '../shared/user.service';
import {VendingMachineService} from '../shared/vending-machine.service';
import {DeliverySheet} from '../model/DeliverySheet';
import {GoodsDescription} from '../model/GoodsDescription';
import {Page} from '../model/Page';

@Component({
  selector: 'app-delivery-sheet-table',
  templateUrl: './delivery-sheet-table.component.html',
  styleUrls: ['./delivery-sheet-table.component.css']
})
export class DeliverySheetTableComponent implements OnInit {

  constructor(private modalService: NzModalService, private refreshEmitter: RefreshEmitterService,
              private goodsService: GoodsService, private notification: NzNotificationService,
              private userService: UserService, private machineService: VendingMachineService) {
  }

  ngOnInit() {
    this.initGoodsDescList();
    this.initSheetPage();
  }

  sheetList: Array<DeliverySheet> = [];

  goodsDescList: Array<GoodsDescription>;

  queryDto: { page: number, size: number } = {page: 1, size: 10};

  totalElements: number;

  private initGoodsDescList() {
    this.goodsService.getGoodsDescList().subscribe(res => {
      if (res.code == 1000) {
        this.goodsDescList = <Array<GoodsDescription>>res.data;
      }
    });
  }

  private initSheetPage() {
    this.goodsService.getSheetPage(this.queryDto).subscribe(res => {
      if (res.code == 1000) {
        let page: Page = <Page>res.data;
        this.sheetList = page.content;
        this.queryDto.page = page.number + 1;
        this.queryDto.size = page.size;
        this.totalElements = page.totalElements;
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
        this.initGoodsDescList();
      }
    });
  }

  pageIndexChange() {
    this.initSheetPage();
  }


  editSheet(s: DeliverySheet) {

  }
}
