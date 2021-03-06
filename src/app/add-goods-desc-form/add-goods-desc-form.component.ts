import {Component, OnInit} from '@angular/core';
import {Cmd} from '../model/Cmd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoodsService} from '../shared/goods.service';
import {NzNotificationService, UploadFile} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';

@Component({
  selector: 'app-add-goods-desc-form',
  templateUrl: './add-goods-desc-form.component.html',
  styleUrls: ['./add-goods-desc-form.component.css']
})
export class AddGoodsDescFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private goodsService: GoodsService,
              private notification: NzNotificationService, private refreshEmitter: RefreshEmitterService
  ) {
    this.validateForm = this.fb.group({
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      barcode:['', [Validators.required]],
    });
  }

  validateForm: FormGroup;
  loading = false;
  fileList: UploadFile[] = [];

  elementToEdit = null;


  beforeUpload = (file: UploadFile): boolean => {
    if (this.fileList.length == 1) {
      this.fileList[0] = file;
    } else {
      this.fileList.push(file);
    }
    return false;
  };


  ngOnInit() {
    if (this.elementToEdit) {
      this.validateForm.controls['description'].setValue(this.elementToEdit.description);
      this.validateForm.controls['price'].setValue(this.elementToEdit.price * 0.01);
      this.validateForm.controls['barcode'].setValue(this.elementToEdit.barcode);
    }
  }

  submit($event, value) {
    if (this.elementToEdit) {
      this.updateGoodsDesc($event, value);
    } else {
      this.addGoodsDesc($event, value);
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  addGoodsDesc($event, value) {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('file', <any>this.fileList[0]);
    formData.append('description', value.description);
    formData.append('price', (value.price * 100).toString());
    formData.append('barcode',value.barcode);
    this.goodsService.saveGoodsDesc(formData).subscribe(res => {
      if (res.code == 1000) {
        this.notification.success('成功', '新增商品成功');
        this.refreshEmitter.emit({name: Cmd.refresh_goods_desc_table});
        this.refreshEmitter.emit({name: Cmd.close_goods_desc_add_form});
      } else {
        this.notification.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  }

  updateGoodsDesc($event, value) {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      if (key == 'file')
        continue;
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.loading = true;
    const formData = new FormData();
    if (this.fileList[0]) {
      formData.append('file', <any>this.fileList[0]);
    }
    formData.append('description', value.description);
    formData.append('price', (value.price * 100).toString());
    formData.append('id', this.elementToEdit.id);
    formData.append('barcode',value.barcode);
    this.goodsService.saveGoodsDesc(formData).subscribe(res => {
      if (res.code == 1000) {
        this.notification.success('成功', '更新成功');
        this.refreshEmitter.emit({name: Cmd.refresh_goods_desc_table});
        this.refreshEmitter.emit({name: Cmd.close_goods_desc_add_form});
      } else {
        this.notification.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  }
}
