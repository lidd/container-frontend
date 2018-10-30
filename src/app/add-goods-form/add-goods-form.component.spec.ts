import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodsFormComponent } from './add-goods-form.component';

describe('AddGoodsFormComponent', () => {
  let component: AddGoodsFormComponent;
  let fixture: ComponentFixture<AddGoodsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoodsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
