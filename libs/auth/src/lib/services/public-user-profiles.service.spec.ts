import { TestBed } from '@angular/core/testing';

import { PublicUserProfilesService } from './public-user-profiles.service';

describe('PublicUserProfilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicUserProfilesService = TestBed.get(PublicUserProfilesService);
    expect(service).toBeTruthy();
  });
});
