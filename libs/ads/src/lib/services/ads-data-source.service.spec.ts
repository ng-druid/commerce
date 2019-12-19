import { TestBed } from '@angular/core/testing';

import { AdsDataSourceService } from './ads-data-source.service';

describe('AdsDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdsDataSourceService = TestBed.get(AdsDataSourceService);
    expect(service).toBeTruthy();
  });
});
