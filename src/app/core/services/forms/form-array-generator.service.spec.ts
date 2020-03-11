import { TestBed } from '@angular/core/testing';

import { FormArrayGeneratorService } from './form-array-generator.service';

describe('FormArrayGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormArrayGeneratorService = TestBed.get(FormArrayGeneratorService);
    expect(service).toBeTruthy();
  });
});
