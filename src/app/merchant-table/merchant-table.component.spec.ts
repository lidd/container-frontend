import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTableComponent } from './merchant-table.component';

describe('MerchantTableComponent', () => {
  let component: MerchantTableComponent;
  let fixture: ComponentFixture<MerchantTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
