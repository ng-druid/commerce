import { Action, createReducer, on } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import { ChatConversation, ChatMessage } from '../../models/chat.models';

export const chatFeatureKey = 'chat';

export interface State {
  conversation: ChatConversation;
  connected: boolean;
  sentMessage: ChatMessage;
  recievedMessage: ChatMessage;
}

export const initialState: State = {
  conversation: undefined,
  connected: undefined,
  sentMessage: undefined,
  recievedMessage: undefined
};

const chatReducer = createReducer(
  initialState,
  on(ChatActions.loadChatConversationSuccess, (state, action) => ({ ...state, conversation: action.data } )),
  on(ChatActions.establishSocketConnectionFailure, state => ({ ...state, connected: false } )),
  on(ChatActions.establishSocketConnectionSuccess, state => ({ ...state, connected: true } )),
  on(ChatActions.sendChatMessage, (state, action) => ({ ...state, sentMessage: action.data } )),
  on(ChatActions.recieveChatMessageSuccess, (state, action) => ({ ...state, recievedMessage: action.data } )),
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
