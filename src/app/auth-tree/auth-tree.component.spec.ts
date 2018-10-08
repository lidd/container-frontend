import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTreeComponent } from './auth-tree.component';

describe('AuthTreeComponent', () => {
  let component: AuthTreeComponent;
  let fixture: ComponentFixture<AuthTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
