import { TestBed } from '@angular/core/testing';

import { CityListItemsService } from './city-list-items.service';

describe('CityListItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityListItemsService = TestBed.get(CityListItemsService);
    expect(service).toBeTruthy();
  });
});
