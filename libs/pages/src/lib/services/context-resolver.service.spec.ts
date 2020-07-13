import { TestBed } from '@angular/core/testing';

import { ContextResolverService } from './context-resolver.service';

describe('ContextResolverService', () => {
  let service: ContextResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
