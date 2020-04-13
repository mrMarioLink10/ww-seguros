import { TestBed } from '@angular/core/testing';

import { NewAuthorizationService } from './new-authorization.service';

describe('NewAuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewAuthorizationService = TestBed.get(NewAuthorizationService);
    expect(service).toBeTruthy();
  });
});
