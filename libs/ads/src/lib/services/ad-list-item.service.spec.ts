import { TestBed } from '@angular/core/testing';

import { AdListItemService } from './ad-list-item.service';

describe('AdListItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdListItemService = TestBed.get(AdListItemService);
    expect(service).toBeTruthy();
  });
});
