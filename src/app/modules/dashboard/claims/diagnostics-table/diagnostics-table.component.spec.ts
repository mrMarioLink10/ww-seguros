import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsTableComponent } from './diagnostics-table.component';

describe('DiagnosticsTableComponent', () => {
  let component: DiagnosticsTableComponent;
  let fixture: ComponentFixture<DiagnosticsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
