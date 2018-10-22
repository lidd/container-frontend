import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDescTableComponent } from './goods-desc-table.component';

describe('GoodsDescTableComponent', () => {
  let component: GoodsDescTableComponent;
  let fixture: ComponentFixture<GoodsDescTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsDescTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsDescTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
