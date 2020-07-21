import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundTableComponent } from './refund-table.component';

describe('RefundTableComponent', () => {
  let component: RefundTableComponent;
  let fixture: ComponentFixture<RefundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
