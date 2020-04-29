import { TestBed } from '@angular/core/testing';

import { PublicUserProfilesDataService } from './public-user-profiles-data.service';

describe('PublicUserProfilesDataService', () => {
  let service: PublicUserProfilesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicUserProfilesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
