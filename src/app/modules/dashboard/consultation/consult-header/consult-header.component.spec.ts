import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultHeaderComponent } from './consult-header.component';

describe('ConsultHeaderComponent', () => {
  let component: ConsultHeaderComponent;
  let fixture: ComponentFixture<ConsultHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
