import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {Urls} from '../model/Urls';
import {GoodsDescription} from '../model/GoodsDescription';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private http: HttpClient) {
  }

  getGoodsDescList(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.goods_desc_list);
  }

  saveGoodsDesc(goodsDesc: FormData): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.goods_desc_add, goodsDesc);
  }
}
