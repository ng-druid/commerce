import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { AdsEffects } from './ads.effects';
import { AdsFacade } from './ads.facade';

import { adsQuery } from './ads.selectors';
import { LoadAds, AdsLoaded } from './ads.actions';
import { AdsState, Entity, initialState, reducer } from './ads.reducer';

interface TestSchema {
  ads: AdsState;
}

describe('AdsFacade', () => {
  let facade: AdsFacade;
  let store: Store<TestSchema>;
  let createAds;

  beforeEach(() => {
    createAds = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('ads', reducer, { initialState }),
          EffectsModule.forFeature([AdsEffects])
        ],
        providers: [AdsFacade]
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
      facade = TestBed.get(AdsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allAds$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allAds$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `AdsLoaded` to manually submit list for state management
     */
    it('allAds$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allAds$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(new AdsLoaded([createAds('AAA'), createAds('BBB')]));

        list = await readFirst(facade.allAds$);
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
