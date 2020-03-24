import { TestBed } from '@angular/core/testing';

import { AdTypesService } from './ad-types.service';

describe('AdTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdTypesService = TestBed.get(AdTypesService);
    expect(service).toBeTruthy();
  });
});
