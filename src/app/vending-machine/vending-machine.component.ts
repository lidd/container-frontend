import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendingMachine} from '../model/VendingMachine';
import {VendingMachineService} from '../shared/vending-machine.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit, OnDestroy {

  constructor(private vendingMachineService: VendingMachineService, private notification: NzNotificationService) {
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
}
