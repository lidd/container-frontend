import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodsDescFormComponent } from './add-goods-desc-form.component';

describe('AddGoodsDescFormComponent', () => {
  let component: AddGoodsDescFormComponent;
  let fixture: ComponentFixture<AddGoodsDescFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoodsDescFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodsDescFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
