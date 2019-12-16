import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ChatEffects } from './chat.effects';
import * as ChatActions from './chat.actions';

describe('ChatEffects', () => {
  let actions: Observable<any>;
  let effects: ChatEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ChatEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(ChatEffects);
  });

  describe('loadChat$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ChatActions.loadChat() });

      const expected = hot('-a-|', {
        a: ChatActions.loadChatSuccess({ chat: [] })
      });

      expect(effects.loadChat$).toBeObservable(expected);
    });
  });
});
