import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChat from './chat.reducer';

export const selectChatState = createFeatureSelector<fromChat.State>(
  fromChat.chatFeatureKey
);

export const selectChatConversation = createSelector(selectChatState, state => state.conversation);
export const selectRecievedChatMessage = createSelector(selectChatState, state => state.recievedMessage);
export const selectChatConnected = createSelector(selectChatState, state => state.connected);
