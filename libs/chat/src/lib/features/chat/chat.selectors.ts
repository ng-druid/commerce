import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChat from './chat.reducer';

export const selectChatState = createFeatureSelector<fromChat.State>(
  fromChat.chatFeatureKey
);

export const selectChatMessages = createSelector(selectChatState, state => state.messages);
export const selectChatInfo = createSelector(selectChatState, state => state.chatInfo);
