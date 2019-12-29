import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  VOCABULARY_FEATURE_KEY,
  State,
  VocabularyPartialState,
  vocabularyAdapter
} from './vocabulary.reducer';

// Lookup the 'Vocabulary' feature state managed by NgRx
export const getVocabularyState = createFeatureSelector<
  VocabularyPartialState,
  State
>(VOCABULARY_FEATURE_KEY);

const { selectAll, selectEntities } = vocabularyAdapter.getSelectors();

export const getVocabularyLoaded = createSelector(
  getVocabularyState,
  (state: State) => state.loaded
);

export const getVocabularyError = createSelector(
  getVocabularyState,
  (state: State) => state.error
);

export const getAllVocabulary = createSelector(
  getVocabularyState,
  (state: State) => selectAll(state)
);

export const getVocabularyEntities = createSelector(
  getVocabularyState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getVocabularyState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getVocabularyEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
