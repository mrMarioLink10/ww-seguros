import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundCommentsComponent } from './refund-comments.component';

describe('RefundCommentsComponent', () => {
  let component: RefundCommentsComponent;
  let fixture: ComponentFixture<RefundCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
