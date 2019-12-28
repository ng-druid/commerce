import { async, TestBed } from '@angular/core/testing';
import { VocabularyModule } from './vocabulary.module';

describe('VocabularyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VocabularyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VocabularyModule).toBeDefined();
  });
});
