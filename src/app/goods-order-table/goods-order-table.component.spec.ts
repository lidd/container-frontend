import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsOrderTableComponent } from './goods-order-table.component';

describe('GoodsOrderTableComponent', () => {
  let component: GoodsOrderTableComponent;
  let fixture: ComponentFixture<GoodsOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
