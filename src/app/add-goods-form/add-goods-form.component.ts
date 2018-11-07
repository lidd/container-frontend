import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GoodsService} from '../shared/goods.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsDescription} from '../model/GoodsDescription';
import {Cmd} from '../model/Cmd';

@Component({
  selector: 'app-add-goods-form',
  templateUrl: './add-goods-form.component.html',
  styleUrls: ['./add-goods-form.component.css']
})
export class AddGoodsFormComponent implements OnInit {

  validateForm: FormGroup;

  goodsDescList = [];

  loading = false;

  controlsConfig = {};

  checkedGoods = [];

  constructor(private fb: FormBuilder, private goodsService: GoodsService,
              private notification: NzNotificationService, private refreshEmitter: RefreshEmitterService
  ) {
  }

  ngOnInit() {
    this.initGoodsDescList();

    this.validateForm = this.fb.group(this.controlsConfig);
  }

  private updateControlsConfig(gd): void {
    this.controlsConfig[gd.value] = [];
  }


  private initGoodsDescList(): void {
    this.goodsService.getGoodsDescList().subscribe(res => {
      if (res.code == 1000) {
        let data = <GoodsDescription[]>res.data;
        data.forEach(o => {
          this.goodsDescList.push({label: o.description, value: o.id});
        });
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  updateCheckGoods() {
    this.checkedGoods = [];
    this.goodsDescList.forEach(value => {
      if (value.checked) {
        this.updateControlsConfig(value);
        this.checkedGoods.push(value);
      }
    });
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  submit($event, value) {
    if (this.checkedGoods.length == 0) {
      return;
    }
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.loading = true;
    this.goodsService.addGoods(value).subscribe(res => {
      if (res.code == 1000) {
        this.notification.success('成功', '新增商品成功');
        this.refreshEmitter.emit({name: Cmd.refresh_goods_table});
        this.refreshEmitter.emit({name: Cmd.close_goods_add_form});
      } else {
        this.notification.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  }
}
