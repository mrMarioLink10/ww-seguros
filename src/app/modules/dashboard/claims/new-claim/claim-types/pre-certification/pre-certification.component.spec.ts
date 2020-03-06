import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCertificationComponent } from './pre-certification.component';

describe('PreCertificationComponent', () => {
  let component: PreCertificationComponent;
  let fixture: ComponentFixture<PreCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
