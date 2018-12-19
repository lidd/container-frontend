import {Injectable} from '@angular/core';
import {Merchant} from '../model/Merchant';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../model/Urls';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) {
  }

  saveMerchant(value: Merchant): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.merchant_save, value);
  }

  getMerchantList(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.merchant_list);
  }

  deleteMerchant(id: number): Observable<BaseResponse> {
    if (id) {
      return this.http.delete<BaseResponse>(Urls.merchant_delete, {params: {id: id.toString()}});
    }
  }
}
