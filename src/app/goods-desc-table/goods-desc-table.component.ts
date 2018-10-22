import {Component, OnInit} from '@angular/core';
import {GoodsDescription} from '../model/GoodsDescription';
import {GoodsService} from '../shared/goods.service';
import {ModalOptionsForService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Cmd} from '../model/Cmd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {AddGoodsDescFormComponent} from '../add-goods-desc-form/add-goods-desc-form.component';

@Component({
  selector: 'app-goods-desc-table',
  templateUrl: './goods-desc-table.component.html',
  styleUrls: ['./goods-desc-table.component.css']
})
export class GoodsDescTableComponent implements OnInit {

  goodsDescList: Array<GoodsDescription> = [];

  constructor(private goodsService: GoodsService, private notification: NzNotificationService,
              private modalService: NzModalService, private refreshEmitter: RefreshEmitterService) {
  }

  ngOnInit() {
    this.initGoodsDescList();
  }

  private initGoodsDescList(): void {
    this.goodsService.getGoodsDescList().subscribe(res => {
      if (res.code == 1000) {
        this.goodsDescList = <Array<GoodsDescription>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  showFullImg(goodsDesc: GoodsDescription) {
    let image = goodsDesc.imageHash;
    let option: ModalOptionsForService = {
      nzWidth: 600,
      nzVisible: true,
      nzTitle: goodsDesc.description,
      nzContent: '<img width="552px" src="' + image + '">',
      nzFooter: null
    };
    this.modalService.create(option);
  }

  addGoodsDescModal() {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '添加商品类型',
      nzContent: AddGoodsDescFormComponent,
      nzFooter: null
    };
    let modalRef = this.modalService.create(option);
    this.refreshEmitter.subscribe(e => {
      if (e.name == Cmd.close_goods_desc_add_form) {
        modalRef.destroy();
      }
      if (e.name == Cmd.refresh_goods_desc_table) {
        this.initGoodsDescList();
      }
    });
  }
}
