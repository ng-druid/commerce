import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ChatEntity } from './chat.models';
import { ChatEffects } from './chat.effects';
import { ChatFacade } from './chat.facade';

import * as ChatSelectors from './chat.selectors';
import * as ChatActions from './chat.actions';
import { CHAT_FEATURE_KEY, State, initialState, reducer } from './chat.reducer';

interface TestSchema {
  chat: State;
}

describe('ChatFacade', () => {
  let facade: ChatFacade;
  let store: Store<TestSchema>;
  const createChatEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ChatEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CHAT_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ChatEffects])
        ],
        providers: [ChatFacade]
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
      facade = TestBed.get(ChatFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allChat$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ChatActions.loadChat());

        list = await readFirst(facade.allChat$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadChatSuccess` to manually update list
     */
    it('allChat$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allChat$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ChatActions.loadChatSuccess({
            chat: [createChatEntity('AAA'), createChatEntity('BBB')]
          })
        );

        list = await readFirst(facade.allChat$);
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
