import { Action, createReducer, on } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import { ChatMessage, ChatInfo } from '../../models/chat.models';

export const chatFeatureKey = 'chat';

export interface State {
  messages: Array<ChatMessage>;
  chatInfo: ChatInfo
}

export const initialState: State = {
  messages: [],
  chatInfo: undefined
};

const chatReducer = createReducer(
  initialState,
  on(ChatActions.loadChatConversationSuccess, (state, action) => ({ ...state, messages: action.data, chatInfo: action.info } )),
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
