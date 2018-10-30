import {Component, EventEmitter, OnInit} from '@angular/core';
import {Goods} from '../model/Goods';
import {ModalOptionsForService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Cmd} from '../model/Cmd';
import {AddGoodsFormComponent} from '../add-goods-form/add-goods-form.component';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsService} from '../shared/goods.service';
import {Page} from '../model/Page';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.css']
})
export class GoodsTableComponent implements OnInit {

  goodsList: Goods[] = [];

  pageIndex: number = 1;
  pageSize: number = 10;
  totalElements: number;

  constructor(private modalService: NzModalService, private refreshEmitter: RefreshEmitterService,
              private goodsService: GoodsService, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.getGoodsPage(this.pageIndex, this.pageSize);
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
        this.getGoodsPage(this.pageIndex, this.pageSize);
      }
    });
  }

  private getGoodsPage(pageIndex: number, pageSize: number) {
    this.goodsService.getGoodsPage(pageIndex, pageSize).subscribe(res => {
      if (res.code == 1000) {
        let page: Page = <Page>res.data;
        this.goodsList = page.content;
        this.pageIndex = page.number + 1;
        this.pageSize = page.size;
        this.totalElements = page.totalElements;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  pageIndexChange() {
    this.getGoodsPage(this.pageIndex, this.pageSize);
  };

}
