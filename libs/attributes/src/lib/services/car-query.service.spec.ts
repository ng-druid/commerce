import { TestBed } from '@angular/core/testing';

import { CarQueryService } from './car-query.service';

describe('CarQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarQueryService = TestBed.get(CarQueryService);
    expect(service).toBeTruthy();
  });
});
