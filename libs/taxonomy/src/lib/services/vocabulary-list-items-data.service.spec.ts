import { TestBed } from '@angular/core/testing';

import { VocabularyListItemsDataService } from './vocabulary-list-items-data.service';

describe('VocabularyListItemsDataService', () => {
  let service: VocabularyListItemsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularyListItemsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
