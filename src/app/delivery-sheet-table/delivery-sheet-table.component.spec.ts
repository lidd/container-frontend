import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySheetTableComponent } from './delivery-sheet-table.component';

describe('DeliverySheetTableComponent', () => {
  let component: DeliverySheetTableComponent;
  let fixture: ComponentFixture<DeliverySheetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverySheetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
