import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ChatActions from './chat.actions';
import { ChatEntity } from './chat.models';

export const CHAT_FEATURE_KEY = 'chat';

export interface State extends EntityState<ChatEntity> {
  selectedId?: string | number; // which Chat record has been selected
  loaded: boolean; // has the Chat list been loaded
  error?: string | null; // last none error (if any)
}

export interface ChatPartialState {
  readonly [CHAT_FEATURE_KEY]: State;
}

export const chatAdapter: EntityAdapter<ChatEntity> = createEntityAdapter<
  ChatEntity
>();

export const initialState: State = chatAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const chatReducer = createReducer(
  initialState,
  on(ChatActions.loadChat, state => ({ ...state, loaded: false, error: null })),
  on(ChatActions.loadChatSuccess, (state, { chat }) =>
    chatAdapter.upsertOne(chat, { ...state, loaded: true })
  ),
  on(ChatActions.loadChatFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
