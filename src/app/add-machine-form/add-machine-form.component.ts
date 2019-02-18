import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../shared/user.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {BaseResponse} from '../model/BaseResponse';
import {Urls} from '../model/Urls';
import {HttpClient} from '@angular/common/http';
import {Merchant} from '../model/Merchant';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {Cmd} from '../model/Cmd';
import {VendingMachineService} from '../shared/vending-machine.service';
import {MerchantService} from '../shared/merchant.service';

@Component({
  selector: 'app-add-machine-form',
  templateUrl: './add-machine-form.component.html',
  styleUrls: ['./add-machine-form.component.css']
})
export class AddMachineFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,
              private notification: NzNotificationService, private http: HttpClient,private merchantService:MerchantService,
              private machineService: VendingMachineService, private refreshEmitter: RefreshEmitterService) {
    this.validateForm = this.fb.group({
      serial: ['', [Validators.required]],
      location: [],
      master: [],
      merchant: []
    });
  }

  validateForm: FormGroup;
  users: Array<User>;
  isMasterLoading = false;
  users$: Observable<BaseResponse>;
  merchant$: Observable<BaseResponse>;
  isMerchantLoading = false;
  searchUserChange$ = new BehaviorSubject('');
  merchants: Array<Merchant>;
  searchMerchantChange$ = new BehaviorSubject('');

  ngOnInit() {
    this.initAllMerchants();
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.machineService.saveMachine(value).subscribe(res => {
      if (res.code == 1000) {
        this.notification.success('成功', '新增售货机成功');
        this.refreshEmitter.emit({name: Cmd.refresh_machine_table});
        this.refreshEmitter.emit({name: Cmd.close_machine_add_form});
      } else {
        this.notification.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  };

  onMasterSearch(value: string): void {
    this.isMasterLoading = true;
    this.searchUserChange$.next(value);
    this.users$.subscribe(res => {
      if (res.code == 1000) {
        this.users = <Array<User>>res.data;
        this.isMasterLoading = false;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
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

  private configSearchUserChange$(): Observable<BaseResponse> {
    return this.searchUserChange$.asObservable().pipe(debounceTime(1000)).pipe(switchMap(this.getUserByNameLike));
  }

  private configSearchMerchantChange$(): Observable<BaseResponse> {
    return this.searchMerchantChange$.asObservable().pipe(debounceTime(1000)).pipe(switchMap(this.getMerchantByNameLike));
  }

  getUserByNameLike = (name: string) => {
    return this.http.get<BaseResponse>(Urls.user_name_like_query, {params: {name: name.trim()}});
  };

  getMerchantByNameLike = (name: string) => {
    return this.http.get<BaseResponse>(Urls.merchant_name_like_query, {params: {name: name.trim()}});
  };

  onMerchantSearch(value: string) {
    this.isMerchantLoading = true;
    this.searchMerchantChange$.next(value);
    this.merchant$.subscribe(res => {
      if (res.code == 1000) {
        this.merchants = <Array<Merchant>>res.data;
        this.isMerchantLoading = false;
      } else {
        this.notification.error('错误', `${res.code}: ${res.msg}`);
      }
    });
  }

  initAllMerchants(){
    this.merchantService.getMerchantList().subscribe(res =>{
      if (res.code == 1000) {
        this.merchants = <Array<Merchant>>res.data;
      }
    })
  }
}
