import { Component, OnInit } from '@angular/core';
import {VendingMachine} from '../model/VendingMachine';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {

  constructor() { }

  machineList:Array<VendingMachine> = [];

  ngOnInit() {
  }

}
