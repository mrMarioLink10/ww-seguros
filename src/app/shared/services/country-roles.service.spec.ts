import { TestBed } from '@angular/core/testing';

import { CountryRolesService } from './country-roles.service';

describe('CountryRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryRolesService = TestBed.get(CountryRolesService);
    expect(service).toBeTruthy();
  });
});
