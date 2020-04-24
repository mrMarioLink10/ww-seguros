import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubscriptionRequestComponent } from './new-subscription-request.component';

describe('NewSubscriptionRequestComponent', () => {
  let component: NewSubscriptionRequestComponent;
  let fixture: ComponentFixture<NewSubscriptionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewSubscriptionRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubscriptionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
