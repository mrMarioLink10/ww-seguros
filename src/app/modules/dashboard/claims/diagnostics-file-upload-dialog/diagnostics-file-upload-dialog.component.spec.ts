import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsFileUploadDialogComponent } from './diagnostics-file-upload-dialog.component';

describe('DiagnosticsFileUploadDialogComponent', () => {
  let component: DiagnosticsFileUploadDialogComponent;
  let fixture: ComponentFixture<DiagnosticsFileUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsFileUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsFileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
