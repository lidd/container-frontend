import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCollectTableComponent } from './goods-collect-table.component';

describe('GoodsCollectTableComponent', () => {
  let component: GoodsCollectTableComponent;
  let fixture: ComponentFixture<GoodsCollectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsCollectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsCollectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
