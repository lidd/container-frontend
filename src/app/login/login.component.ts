import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseResponse} from '../model/BaseResponse';
import {User} from '../model/User';
import {UserService} from '../shared/user.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router, private notifyService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    let username = this.validateForm.get('username').value;
    let password = this.validateForm.get('password').value;
    this.userService.login(username, password).subscribe(res => {
      if (res.code == 1000) {
        this.userService.setCurrentUser((<User>res.data));
        this.route.navigate(['home']);
      } else {
        this.notifyService.config({
          nzPlacement: 'bottomRight'
        });
        this.notifyService.error('登录失败', `${res.code}:${res.msg}`);
      }
    });
  }
}
