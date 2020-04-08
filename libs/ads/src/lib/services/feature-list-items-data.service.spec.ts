import { TestBed } from '@angular/core/testing';

import { FeatureListItemsDataService } from './feature-list-items-data.service';

describe('FeatureListItemsDataService', () => {
  let service: FeatureListItemsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureListItemsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
