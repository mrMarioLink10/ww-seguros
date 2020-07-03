import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFilterComponent } from './receipt-filter.component';

describe('ReceiptFilterComponent', () => {
  let component: ReceiptFilterComponent;
  let fixture: ComponentFixture<ReceiptFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
