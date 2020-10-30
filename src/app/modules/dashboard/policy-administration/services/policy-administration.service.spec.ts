import { TestBed } from '@angular/core/testing';

import { PolicyAdministrationService } from './policy-administration.service';

describe('PolicyAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicyAdministrationService = TestBed.get(PolicyAdministrationService);
    expect(service).toBeTruthy();
  });
});
