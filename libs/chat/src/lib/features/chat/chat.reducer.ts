import { Action, createReducer, on } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import { ChatConversation } from '../../models/chat.models';

export const chatFeatureKey = 'chat';

export interface State {
  conversation: ChatConversation;
}

export const initialState: State = {
  conversation: undefined
};

const chatReducer = createReducer(
  initialState,
  on(ChatActions.loadChatConversationSuccess, (state, action) => ({ ...state, conversation: action.data } )),
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
