import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {Urls} from '../model/Urls';

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

  getGoodsPage(page: number, size: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.goods_page, {params: {page: page.toString(), size: size.toString()}});
  }

  addGoods(value: any): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.goods_add, value);
  }
}
