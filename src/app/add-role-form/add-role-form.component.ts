import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {NzNotificationService} from 'ng-zorro-antd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {Cmd} from '../model/Cmd';
import {RoleService} from '../shared/role.service';

@Component({
  selector: 'app-add-role-form',
  templateUrl: './add-role-form.component.html',
  styleUrls: ['./add-role-form.component.css']
})
export class AddRoleFormComponent implements OnInit {

  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.roleService.addRole(value.rolename).subscribe(res => {
      if (res.code == 1000) {
        this.notifyService.success('成功', '新增角色成功');
        this.refreshEmitter.emit({name: Cmd.refresh_role_table});
        this.refreshEmitter.emit({name: Cmd.close_role_add_form});
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

  rolenameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    this.roleService.getRoleByName(control.value).subscribe(res => {
      if (res.code == 1000) {
        if (res.data) {
          observer.next({error: true, duplicated: true});
        } else {
          observer.next(null);
        }
      }
      observer.complete();
    });
  });

  constructor(private fb: FormBuilder, private roleService: RoleService,
              private notifyService: NzNotificationService, private refreshEmitter: RefreshEmitterService) {
    this.validateForm = this.fb.group({
      rolename: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

}
