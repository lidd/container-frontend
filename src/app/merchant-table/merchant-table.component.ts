import {Component, OnInit} from '@angular/core';
import {Merchant} from '../model/Merchant';
import {ModalOptionsForService, NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {AddUserFormComponent} from '../add-user-form/add-user-form.component';
import {Cmd} from '../model/Cmd';
import {AddMerchantFormComponent} from '../add-merchant-form/add-merchant-form.component';
import {MerchantService} from '../shared/merchant.service';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.css']
})
export class MerchantTableComponent implements OnInit {

  constructor(private modalService: NzModalService, private merchantService: MerchantService,
              private refreshEmitter: RefreshEmitterService, private notification: NzNotificationService) {
  }

  merchantList: Array<Merchant> = [];

  modalRef: NzModalRef;

  ngOnInit() {
    this.loadMerchantList();
    this.refreshEmitter.subscribe(e => {
      if (e.name == Cmd.close_merchant_add_form) {
        this.modalRef.destroy();
      }
      if (e.name == Cmd.refresh_merchant_table) {
        this.loadMerchantList();
      }
    });
  }


  createEditModal(merchant: Merchant) {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '编辑商户',
      nzContent: AddMerchantFormComponent,
      nzComponentParams: {merchant: merchant},
      nzFooter: null
    };
    this.modalRef = this.modalService.create(option);
  }

  private loadMerchantList(): void {
    this.merchantService.getMerchantList().subscribe(res => {
      if (res.code == 1000) {
        this.merchantList = <Array<Merchant>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  addMerchantModal() {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '添加商户',
      nzContent: AddMerchantFormComponent,
      nzFooter: null
    };
    this.modalRef = this.modalService.create(option);

  }

  deleteMerchant(merchant: Merchant) {
    this.merchantService.deleteMerchant(merchant.id).subscribe(res => {
      if (res.code == 1000) {
        this.refreshEmitter.emit({name: Cmd.refresh_merchant_table});
        this.notification.success('成功', '删除成功');
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }
}
