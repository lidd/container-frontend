import {Component, OnInit} from '@angular/core';
import {Cmd} from '../model/Cmd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MerchantService} from '../shared/merchant.service';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Merchant} from '../model/Merchant';

@Component({
  selector: 'app-add-merchant-form',
  templateUrl: './add-merchant-form.component.html',
  styleUrls: ['./add-merchant-form.component.css']
})
export class AddMerchantFormComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private merchantService: MerchantService,
              private refreshEmitter: RefreshEmitterService,
              private notification: NzNotificationService) {
    this.validateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      alipayAppId: [],
      alipayCallbackUrl: [],
      alipayPrivateKey: [],
      wxAppId: [],
      wxCallbackUrl: [],
      wxCertPath: [],
      wxConnectTimeout: [],
      wxKey: [],
      wxMchId: [],
    });
  }

  merchant: Merchant = {};
  loading = false;

  ngOnInit() {
  }

  submit($event, value) {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.loading = true;
    this.merchantService.saveMerchant(this.merchant).subscribe(res => {
      if (res.code == 1000) {
        this.notification.success('成功', '新增商户成功');
        this.refreshEmitter.emit({name: Cmd.refresh_merchant_table});
        this.refreshEmitter.emit({name: Cmd.close_merchant_add_form});
      } else {
        this.notification.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

}
