import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { VocabularyEffects } from './vocabulary.effects';
import * as VocabularyActions from './vocabulary.actions';

describe('VocabularyEffects', () => {
  let actions: Observable<any>;
  let effects: VocabularyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        VocabularyEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(VocabularyEffects);
  });

  describe('loadVocabulary$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: VocabularyActions.loadVocabulary() });

      const expected = hot('-a-|', {
        a: VocabularyActions.loadVocabularySuccess({ vocabulary: [] })
      });

      expect(effects.loadVocabulary$).toBeObservable(expected);
    });
  });
});
