import { TestBed } from '@angular/core/testing';

import { AdTypePluginsService } from './ad-type-plugins.service';

describe('AdTypePluginsService', () => {
  let service: AdTypePluginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdTypePluginsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
