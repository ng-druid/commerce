import { TestBed } from '@angular/core/testing';

import { AdTypesDataService } from './ad-types-data.service';

describe('AdTypesDataService', () => {
  let service: AdTypesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdTypesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
