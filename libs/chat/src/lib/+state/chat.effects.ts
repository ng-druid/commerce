import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromChat from './chat.reducer';
import * as ChatActions from './chat.actions';
import { ChatEntity } from './chat.models';

@Injectable()
export class ChatEffects {
  loadChat$ = createEffect(() =>
    this.dataPersistence.fetch(ChatActions.loadChat, {
      run: (
        action: ReturnType<typeof ChatActions.loadChat>,
        state: fromChat.ChatPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return ChatActions.loadChatSuccess({ chat: {} as ChatEntity });
      },

      onError: (action: ReturnType<typeof ChatActions.loadChat>, error) => {
        console.error('Error', error);
        return ChatActions.loadChatFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromChat.ChatPartialState>
  ) {}
}
