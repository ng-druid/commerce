import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromChat from './chat.reducer';
import * as ChatSelectors from './chat.selectors';

@Injectable()
export class ChatFacade {
  loaded$ = this.store.pipe(select(ChatSelectors.getChatLoaded));
  allChat$ = this.store.pipe(select(ChatSelectors.getAllChat));
  selectedChat$ = this.store.pipe(select(ChatSelectors.getSelected));

  constructor(private store: Store<fromChat.ChatPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
