import { TestBed } from '@angular/core/testing';

import { AdListItemsDataService } from './ad-list-items-data.service';

describe('AdListItemsDataService', () => {
  let service: AdListItemsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdListItemsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
