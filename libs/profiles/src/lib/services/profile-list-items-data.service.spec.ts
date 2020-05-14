import { TestBed } from '@angular/core/testing';

import { ProfileListItemsDataService } from './profile-list-items-data.service';

describe('ProfileListItemsDataService', () => {
  let service: ProfileListItemsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileListItemsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
