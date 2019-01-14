import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/BaseResponse';
import {Urls} from '../model/Urls';
import {DeliverySheet} from '../model/DeliverySheet';

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

  getGoodsPage(queryParams): Observable<BaseResponse> {
    let queryDto: any = {};
    Object.assign(queryDto, queryParams);
    let createTime: Date[] = queryParams.createTime;
    if (createTime)
      queryDto.createTime = createTime[0].getTime() + ',' + createTime[1].getTime();
    // goodsDescriptionId: '',
    //   goodsStatus: '',
    //   machineSerial: '',
    //   createTime: ''
    let goodsDescriptionId = queryParams.goodsDescriptionId;
    if (goodsDescriptionId)
      queryDto.goodsDescriptionId = goodsDescriptionId.toString();
    let goodsStatus = queryParams.goodsStatus;
    if (goodsStatus)
      queryDto.goodsStatus = goodsStatus.toString();
    let machineSerial = queryParams.machineSerial;
    if (machineSerial)
      queryDto.machineSerial = machineSerial.toString();
    return this.http.get<BaseResponse>(Urls.goods_page, {params: queryDto});
  }

  addGoods(value: any): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(Urls.delivery_sheet_add, value);
  }

  getOrderPage(params): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(Urls.order_page, {params: params});
  }

  saveDeliveryman(selectedMan: any, selectedMachine: any, goods: Array<number>) {
    return this.http.post<BaseResponse>(Urls.set_deliveryman, {userId: selectedMan, serial: selectedMachine, goodsIds: goods});
  }

  getSheetPage(params) {
    return this.http.get<BaseResponse>(Urls.get_sheet_page,{params: params});
  }

  getGoodsCollectPage(queryDto: { page: string; size: string }) {
    return this.http.get<BaseResponse>(Urls.goods_collect_page, {params:queryDto});
  }

  editDeliverSheet(s: DeliverySheet){
    return this.http.post<BaseResponse>(Urls.delivery_sheet_save, s);
  }
}
