import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusTableComponent } from './account-status-table.component';

describe('AccountStatusTableComponent', () => {
  let component: AccountStatusTableComponent;
  let fixture: ComponentFixture<AccountStatusTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountStatusTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
