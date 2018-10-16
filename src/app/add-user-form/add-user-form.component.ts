import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {UserService} from '../shared/user.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {Cmd} from '../model/Cmd';
import {debounceTime, distinctUntilChanged, flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {

  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.userService.addUser(value.username, value.phone, value.password, value.gender).subscribe(res => {
      if (res.code == 1000) {
        this.notifyService.success('成功', '新增用户成功');
        this.refreshEmitter.emit({cmd: Cmd.refresh_user_table});
        this.refreshEmitter.emit({cmd: Cmd.close_user_add_form});
      } else {
        this.notifyService.error('失败', `${res.code}: ${res.msg}`);
      }
    });
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  usernameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    control.valueChanges.pipe(
      debounceTime(5000),
      distinctUntilChanged(),
      flatMap(value => this.userService.validUsername(value))).subscribe(res => {
      if (res.code == 1000) {
        if (res.data) {
          observer.next({error: true, duplicated: true});
        } else {
          observer.next(null);
        }
      }
    });
  });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  constructor(private fb: FormBuilder, private userService: UserService,
              private notifyService: NzNotificationService, private refreshEmitter: RefreshEmitterService) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      gender: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

}
