import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {Resource} from '../model/Resource';
import {Urls} from '../model/Urls';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }

  fakeResources: Array<Resource> = [{id: 1, name: 'res1', children: [{id: 2, name: 'rec_chi_1'}]}
    , {id: 3, name: 'res2'}];
  // response: BaseResponse = {code: 1000, data: this.fakeResources};

  allResources(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.resource_list);
  }
}
