import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachineTableComponent } from './vending-machine-table.component';

describe('VendingMachineTableComponent', () => {
  let component: VendingMachineTableComponent;
  let fixture: ComponentFixture<VendingMachineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingMachineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
