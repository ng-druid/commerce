import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHAT_FEATURE_KEY,
  State,
  ChatPartialState,
  chatAdapter
} from './chat.reducer';

// Lookup the 'Chat' feature state managed by NgRx
export const getChatState = createFeatureSelector<ChatPartialState, State>(
  CHAT_FEATURE_KEY
);

const { selectAll, selectEntities } = chatAdapter.getSelectors();

export const getChatLoaded = createSelector(
  getChatState,
  (state: State) => state.loaded
);

export const getChatError = createSelector(
  getChatState,
  (state: State) => state.error
);

export const getAllChat = createSelector(
  getChatState,
  (state: State) => selectAll(state)
);

export const getChatEntities = createSelector(
  getChatState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getChatState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getChatEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
