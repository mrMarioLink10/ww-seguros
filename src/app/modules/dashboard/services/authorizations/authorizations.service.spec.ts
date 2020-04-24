import { TestBed } from '@angular/core/testing';

import { AuthorizationsService } from './authorizations.service';

describe('AuthorizationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationsService = TestBed.get(AuthorizationsService);
    expect(service).toBeTruthy();
  });
});
