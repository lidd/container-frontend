import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../model/Urls';
import {VendingMachine} from '../model/VendingMachine';

@Injectable({
  providedIn: 'root'
})
export class VendingMachineService {

  constructor(private http: HttpClient) {
  }

  getMachines(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.machine_list);
  }

  saveMachine(value: any): Observable<BaseResponse> {
    let machine: VendingMachine = {
      serial: value.serial,
      location: value.location,
      master: {id: value.master},
      merchant: {id: value.merchant},
      exp:value.exp
    };
    if(value.id){
      machine.id = value.id;
    }
    if (value.capacity) {
      machine.capacity = value.capacity;
    }
    return this.http.post<BaseResponse>(Urls.machine_save, machine);
  }

  deleteById(id: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.delete_machine, {params: {id: id.toString()}});
  }
}
