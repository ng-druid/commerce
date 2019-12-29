import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { VocabularyEntity } from './vocabulary.models';
import { VocabularyEffects } from './vocabulary.effects';
import { VocabularyFacade } from './vocabulary.facade';

import * as VocabularySelectors from './vocabulary.selectors';
import * as VocabularyActions from './vocabulary.actions';
import {
  VOCABULARY_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './vocabulary.reducer';

interface TestSchema {
  vocabulary: State;
}

describe('VocabularyFacade', () => {
  let facade: VocabularyFacade;
  let store: Store<TestSchema>;
  const createVocabularyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as VocabularyEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VOCABULARY_FEATURE_KEY, reducer),
          EffectsModule.forFeature([VocabularyEffects])
        ],
        providers: [VocabularyFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(VocabularyFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allVocabulary$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(VocabularyActions.loadVocabulary());

        list = await readFirst(facade.allVocabulary$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadVocabularySuccess` to manually update list
     */
    it('allVocabulary$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allVocabulary$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          VocabularyActions.loadVocabularySuccess({
            vocabulary: [
              createVocabularyEntity('AAA'),
              createVocabularyEntity('BBB')
            ]
          })
        );

        list = await readFirst(facade.allVocabulary$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
