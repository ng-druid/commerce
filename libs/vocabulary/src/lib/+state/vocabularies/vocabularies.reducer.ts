import { Vocabulary } from '@classifieds-ui/taxonomy';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as VocabulariesActions from './vocabularies.actions';

export const VOCABULARIES_FEATURE_KEY = 'vocabularies';

export interface State extends EntityState<Vocabulary> {
  selectedId?: string | number; // which Vocabularies record has been selected
  loaded: boolean; // has the Vocabularies list been loaded
  error?: string | null; // last none error (if any)
}

export interface VocabulariesPartialState {
  readonly [VOCABULARIES_FEATURE_KEY]: State;
}

export const vocabulariesAdapter: EntityAdapter<
Vocabulary
> = createEntityAdapter<Vocabulary>();

export const initialState: State = vocabulariesAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const vocabulariesReducer = createReducer(
  initialState,
  on(VocabulariesActions.loadVocabularies, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(VocabulariesActions.loadVocabulariesSuccess, (state, { vocabularies }) =>
    vocabulariesAdapter.addAll(vocabularies, { ...state, loaded: true })
  ),
  on(VocabulariesActions.loadVocabulariesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return vocabulariesReducer(state, action);
}
