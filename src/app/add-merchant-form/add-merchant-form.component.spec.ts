import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMerchantFormComponent } from './add-merchant-form.component';

describe('AddMerchantFormComponent', () => {
  let component: AddMerchantFormComponent;
  let fixture: ComponentFixture<AddMerchantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMerchantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
