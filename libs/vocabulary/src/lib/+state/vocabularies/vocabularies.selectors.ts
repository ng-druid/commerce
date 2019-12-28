import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  VOCABULARIES_FEATURE_KEY,
  State,
  VocabulariesPartialState,
  vocabulariesAdapter
} from './vocabularies.reducer';

// Lookup the 'Vocabularies' feature state managed by NgRx
export const getVocabulariesState = createFeatureSelector<
  VocabulariesPartialState,
  State
>(VOCABULARIES_FEATURE_KEY);

const { selectAll, selectEntities } = vocabulariesAdapter.getSelectors();

export const getVocabulariesLoaded = createSelector(
  getVocabulariesState,
  (state: State) => state.loaded
);

export const getVocabulariesError = createSelector(
  getVocabulariesState,
  (state: State) => state.error
);

export const getAllVocabularies = createSelector(
  getVocabulariesState,
  (state: State) => selectAll(state)
);

export const getVocabulariesEntities = createSelector(
  getVocabulariesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getVocabulariesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getVocabulariesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
