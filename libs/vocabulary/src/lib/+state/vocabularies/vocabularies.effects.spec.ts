import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { VocabulariesEffects } from './vocabularies.effects';
import * as VocabulariesActions from './vocabularies.actions';

describe('VocabulariesEffects', () => {
  let actions: Observable<any>;
  let effects: VocabulariesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        VocabulariesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(VocabulariesEffects);
  });

  describe('loadVocabularies$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: VocabulariesActions.loadVocabularies() });

      const expected = hot('-a-|', {
        a: VocabulariesActions.loadVocabulariesSuccess({ vocabularies: [] })
      });

      expect(effects.loadVocabularies$).toBeObservable(expected);
    });
  });
});
