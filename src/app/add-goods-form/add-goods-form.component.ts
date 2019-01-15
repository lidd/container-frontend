import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GoodsService} from '../shared/goods.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {GoodsDescription} from '../model/GoodsDescription';
import {Cmd} from '../model/Cmd';
import {UserService} from '../shared/user.service';
import {VendingMachineService} from '../shared/vending-machine.service';
import {VendingMachine} from '../model/VendingMachine';

@Component({
  selector: 'app-add-goods-form',
  templateUrl: './add-goods-form.component.html',
  styleUrls: ['./add-goods-form.component.css']
})
export class AddGoodsFormComponent implements OnInit {

  validateForm: FormGroup;

  goodsDescList = [];

  userList = [];

  machineList: Array<VendingMachine> = [];

  loading = false;

  controlsConfig: any = {};

  checkedGoods = [];

  checkedMachine: VendingMachine = {capacity: 0};

  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private goodsService: GoodsService,
              private notification: NzNotificationService, private refreshEmitter: RefreshEmitterService,
              private userService: UserService, private machineService: VendingMachineService
  ) {
  }

  ngOnInit() {
    this.initGoodsDescList();

    this.initDeliverymanAndMachine();

    this.controlsConfig.deliverymanId = [];
    this.controlsConfig.machineId = [];

    this.validateForm = this.fb.group(this.controlsConfig);
  }

  private updateControlsConfig(gd): void {
    this.controlsConfig[gd.value] = [];
    this.controlsConfig.deliverymanId = [];
    this.controlsConfig.machineId = [];
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

  updateCheckGoods(value) {
    this.checkedGoods = [];
    this.goodsDescList.forEach(value => {
      if (value.checked) {
        this.updateControlsConfig(value);
        this.checkedGoods.push(value);
      }
    });
    this.totalAmount = 0;
    for (let name in value) {
      if (!value.hasOwnProperty(name) || name == 'deliverymanId' || name == 'machineId') {
        continue;
      }
      this.totalAmount += value[name];
    }
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
        this.notification.success('成功', '新增配货单成功');
        this.refreshEmitter.emit({name: Cmd.refresh_goods_table});
        this.refreshEmitter.emit({name: Cmd.close_goods_add_form});
      } else {
        this.notification.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  }

  initDeliverymanAndMachine() {
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

  updateTotalAmount(value) {
    this.totalAmount = 0;
    for (let name in value) {
      if (!value.hasOwnProperty(name) || name == 'deliverymanId' || name == 'machineId') {
        continue;
      }
      this.totalAmount += value[name];
    }
  }

  updateCheckMachine(value) {
    this.machineList.filter(e => {
      if (e.id == value['machineId']) {
        this.checkedMachine = e;
        return;
      }
    });
  }
}
