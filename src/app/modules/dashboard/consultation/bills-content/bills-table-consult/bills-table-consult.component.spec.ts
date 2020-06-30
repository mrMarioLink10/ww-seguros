import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsTableConsultComponent } from './bills-table-consult.component';

describe('BillsTableConsultComponent', () => {
  let component: BillsTableConsultComponent;
  let fixture: ComponentFixture<BillsTableConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsTableConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsTableConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
