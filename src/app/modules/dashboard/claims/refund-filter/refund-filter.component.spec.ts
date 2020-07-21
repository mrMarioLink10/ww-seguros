import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundFilterComponent } from './refund-filter.component';

describe('RefundFilterComponent', () => {
  let component: RefundFilterComponent;
  let fixture: ComponentFixture<RefundFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
