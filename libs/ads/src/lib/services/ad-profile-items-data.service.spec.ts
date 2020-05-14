import { TestBed } from '@angular/core/testing';

import { AdProfileItemsDataService } from './ad-profile-items-data.service';

describe('AdListItemsDataService', () => {
  let service: AdProfileItemsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdProfileItemsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
