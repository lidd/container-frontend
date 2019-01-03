import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../model/User';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }


  canActivate() {
    if (this.userService.currentUser) {
      return of(true);
    } else {
      return this.checkSession();
    }
  }

  checkSession(): Observable<boolean> {
    return this.userService.checkFromSession().pipe(
      map(res => {
        if (res.code == 1000) {
          this.userService.setCurrentUser(<User>res.data);
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}
