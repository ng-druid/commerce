import { TestBed } from '@angular/core/testing';

import { FeatureListItemsService } from './feature-list-items.service';

describe('FeatureListItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureListItemsService = TestBed.get(FeatureListItemsService);
    expect(service).toBeTruthy();
  });
});
