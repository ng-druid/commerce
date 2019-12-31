import { TestBed } from '@angular/core/testing';

import { AdDataService } from './ad-data.service';

describe('AdDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdDataService = TestBed.get(AdDataService);
    expect(service).toBeTruthy();
  });
});
