import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendingMachine} from '../model/VendingMachine';
import {VendingMachineService} from '../shared/vending-machine.service';
import {ModalOptionsForService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Cmd} from '../model/Cmd';
import {AddMachineFormComponent} from '../add-machine-form/add-machine-form.component';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../model/Urls';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine-table.component.html',
  styleUrls: ['./vending-machine-table.component.css']
})
export class VendingMachineTableComponent implements OnInit, OnDestroy {

  constructor(private vendingMachineService: VendingMachineService,
              private nzModalService: NzModalService,
              private notification: NzNotificationService,
              private refreshEmitter: RefreshEmitterService,
              private http: HttpClient) {
  }

  machineList: Array<VendingMachine> = [];

  timer;

  ngOnInit() {
    this.initMachineList();
    this.timer = setInterval(() => {
      this.initMachineList();
    }, 5000);
  }

  private initMachineList(): void {
    this.vendingMachineService.getMachines().subscribe(res => {
      if (res.code == 1000) {
        this.machineList = <Array<VendingMachine>>res.data;
        for (let machine of this.machineList) {
          if ((new Date().getTime() - machine.updateTime) > 40000) {
            this.http.post(Urls.upload_machine_status, machine).subscribe(res => console.log(res));
          }
        }
      } else {
        this.notification.error('错误', `${res.code}: ${res.data}`);
      }
    });
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
