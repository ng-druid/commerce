import { TestBed } from '@angular/core/testing';

import { VocabulariesDataService } from './vocabularies-data.service';

describe('VocabulariesDataService', () => {
  let service: VocabulariesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabulariesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
