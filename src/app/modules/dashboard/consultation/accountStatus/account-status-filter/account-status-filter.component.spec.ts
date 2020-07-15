import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusFilterComponent } from './account-status-filter.component';

describe('AccountStatusFilterComponent', () => {
  let component: AccountStatusFilterComponent;
  let fixture: ComponentFixture<AccountStatusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountStatusFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
