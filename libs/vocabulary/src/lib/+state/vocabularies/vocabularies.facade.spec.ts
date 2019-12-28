import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { VocabulariesEntity } from './vocabularies.models';
import { VocabulariesEffects } from './vocabularies.effects';
import { VocabulariesFacade } from './vocabularies.facade';

import * as VocabulariesSelectors from './vocabularies.selectors';
import * as VocabulariesActions from './vocabularies.actions';
import {
  VOCABULARIES_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './vocabularies.reducer';

interface TestSchema {
  vocabularies: State;
}

describe('VocabulariesFacade', () => {
  let facade: VocabulariesFacade;
  let store: Store<TestSchema>;
  const createVocabulariesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as VocabulariesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VOCABULARIES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([VocabulariesEffects])
        ],
        providers: [VocabulariesFacade]
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
      facade = TestBed.get(VocabulariesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allVocabularies$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(VocabulariesActions.loadVocabularies());

        list = await readFirst(facade.allVocabularies$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadVocabulariesSuccess` to manually update list
     */
    it('allVocabularies$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allVocabularies$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          VocabulariesActions.loadVocabulariesSuccess({
            vocabularies: [
              createVocabulariesEntity('AAA'),
              createVocabulariesEntity('BBB')
            ]
          })
        );

        list = await readFirst(facade.allVocabularies$);
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
