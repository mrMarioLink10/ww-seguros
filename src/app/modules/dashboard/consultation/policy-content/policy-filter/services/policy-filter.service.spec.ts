import { TestBed } from '@angular/core/testing';

import { PolicyFilterService } from './policy-filter.service';

describe('PolicyFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicyFilterService = TestBed.get(PolicyFilterService);
    expect(service).toBeTruthy();
  });
});
