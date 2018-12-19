import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Urls} from '../model/Urls';
import {BaseResponse} from '../model/BaseResponse';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private route: Router) {
  }

  getUserList(params?): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.user_list, {params: params});
  }

  currentUser: User;

  login(username: string, password: string): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.user_login, {username: username, password: password});
  }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  queryUser(id: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.user_exact_query, {params: {id: id.toString()}});
  }

  checkFromSession(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.valid_session);
  }

  authUser(userId: number, checkedRoles: Array<number>): Observable<BaseResponse> {
    this.http.post(Urls.user_auth, {'subject': userId, 'authorityIds': checkedRoles}).subscribe(res => console.log(res));
    return this.http.post<BaseResponse>(Urls.user_auth, {'subject': userId, 'authorityIds': checkedRoles});
  }

  saveUser(user: User): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.user_update, {id: user.id, name: user.name, phone: user.phone, merchant: user.merchant});
  }

  logout() {
    this.setCurrentUser(undefined);
    this.route.navigate(['login']);
  }

  addUser(name: string, phone: string, password: string, gender: number): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.user_add, {name: name, phone: phone, password: password, gender: gender});
  }

  validUsername(name: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.username_valid, {params: {name: name}});
  }

  getUserByNameLike(name: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.user_name_like_query, {params: {name: name}});
  }
}
