import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendingMachine} from '../model/VendingMachine';
import {VendingMachineService} from '../shared/vending-machine.service';
import {ModalOptionsForService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {AddUserFormComponent} from '../add-user-form/add-user-form.component';
import {Cmd} from '../model/Cmd';
import {AddMachineFormComponent} from '../add-machine-form/add-machine-form.component';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit, OnDestroy {

  constructor(private vendingMachineService: VendingMachineService,
              private nzModalService:NzModalService,
              private notification: NzNotificationService,
              private refreshEmitter:RefreshEmitterService) {
  }

  machineList: Array<VendingMachine> = [];

  timer;

  ngOnInit() {
    this.initMachineList();
    this.timer = setInterval(() => this.initMachineList(), 5000);
  }

  private initMachineList(): void {
    this.vendingMachineService.getMachines().subscribe(res => {
      if (res.code == 1000) {
        this.machineList = <Array<VendingMachine>>res.data;
      } else {
        this.notification.error('错误', `${res.code}: ${res.data}`);
      }
    });
  }

  parseStatus(machine: VendingMachine): string {
    switch (machine.status) {
      case 1000:
        return '在线';
      case 9999:
        return '离线';
      default:
        return '未知';
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  addMachineModal() {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '新增机器',
      nzContent: AddMachineFormComponent,
      nzFooter: null
    };
    let modalRef = this.nzModalService.create(option);
    this.refreshEmitter.subscribe(e => {
      if (e.name == Cmd.close_machine_add_form) {
        modalRef.destroy();
      }
      if (e.name == Cmd.refresh_machine_table) {
        this.initMachineList();
      }
    });
  }
}
