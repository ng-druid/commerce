import { TestBed } from '@angular/core/testing';

import { AdListItemDataService } from './ad-list-item-data.service';

describe('AdListItemDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdListItemDataService = TestBed.get(AdListItemDataService);
    expect(service).toBeTruthy();
  });
});
