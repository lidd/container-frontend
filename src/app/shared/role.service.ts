import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {Urls} from '../model/Urls';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  allRoles(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.role_list);
  }

  getResourcesByRoleId(roleId: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.role_query, {params: {id: roleId.toString()}});
  }

  save(selectedRoleId: number, nodes: number[]): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.role_authorize, {subject: selectedRoleId, authorityIds: nodes});
  }

  getRoleByName(value: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.role_query, {params: {name: value}});
  }

  addRole(name: string): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.role_add, {name: name});
  }
}
