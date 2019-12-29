import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as VocabularyActions from './vocabulary.actions';

import { Vocabulary } from '../../models/taxonomy.models';

export const VOCABULARY_FEATURE_KEY = 'vocabulary';

export interface State extends EntityState<Vocabulary> {
  selectedId?: string | number; // which Vocabulary record has been selected
  loaded: boolean; // has the Vocabulary list been loaded
  error?: string | null; // last none error (if any)
}

export interface VocabularyPartialState {
  readonly [VOCABULARY_FEATURE_KEY]: State;
}

export const vocabularyAdapter: EntityAdapter<
  Vocabulary
> = createEntityAdapter<Vocabulary>();

export const initialState: State = vocabularyAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const vocabularyReducer = createReducer(
  initialState,
  on(VocabularyActions.loadVocabulary, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(VocabularyActions.loadVocabularySuccess, (state, { vocabulary }) =>
    vocabularyAdapter.upsertOne(vocabulary, { ...state, loaded: true })
  ),
  on(VocabularyActions.updateVocabularySuccess, (state, { vocabulary }) =>
    vocabularyAdapter.upsertOne(vocabulary, { ...state, loaded: true })
  ),
  on(VocabularyActions.loadVocabularyFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return vocabularyReducer(state, action);
}
