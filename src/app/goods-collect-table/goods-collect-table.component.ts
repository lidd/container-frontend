import {Component, OnInit} from '@angular/core';
import {GoodsCollect} from '../model/GoodsCollect';
import {GoodsService} from '../shared/goods.service';
import {Page} from '../model/Page';
import zh from '@angular/common/locales/zh';
import {p, st} from '@angular/core/src/render3';
import {registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-goods-collect-table',
  templateUrl: './goods-collect-table.component.html',
  styleUrls: ['./goods-collect-table.component.css']
})
export class GoodsCollectTableComponent implements OnInit {

  collectData: Array<GoodsCollect> = [];

  dateRange: Array<Date>;

  queryDto: any = {page: 1, size: 10};

  totalElements: number;

  constructor(private goodsService: GoodsService) {
  }

  ngOnInit() {
    registerLocaleData(zh);
    this.initPage();
  }

  initPage() {
    if (this.dateRange && this.dateRange.length === 2) {
      this.queryDto.from = this.dateRange[0].getTime();
      this.queryDto.to = this.dateRange[1].getTime();
    }
    this.goodsService.getGoodsCollectPage(this.queryDto).subscribe(res => {
      if (res.code == 1000) {
        let page: Page = <Page>res.data;
        this.collectData = page.content;
        this.queryDto.page = page.number + 1;
        this.queryDto.size = page.size;
        this.totalElements = page.totalElements;
      }
    });
  }

  pageIndexChange() {
    this.initPage();
  }
}
