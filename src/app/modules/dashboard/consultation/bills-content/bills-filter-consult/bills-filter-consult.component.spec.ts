import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsFilterConsultComponent } from './bills-filter-consult.component';

describe('BillsFilterConsultComponent', () => {
  let component: BillsFilterConsultComponent;
  let fixture: ComponentFixture<BillsFilterConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsFilterConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsFilterConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
