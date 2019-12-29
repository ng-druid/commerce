import { createAction, props } from '@ngrx/store';
import { Vocabulary } from '../../models/taxonomy.models';

export const loadVocabulary = createAction(
  '[Vocabulary] Load Vocabulary',
  props<{ id: string }>()
);

export const loadVocabularySuccess = createAction(
  '[Vocabulary] Load Vocabulary Success',
  props<{ vocabulary: Vocabulary }>()
);

export const loadVocabularyFailure = createAction(
  '[Vocabulary] Load Vocabulary Failure',
  props<{ error: any }>()
);

export const updateVocabulary = createAction(
  '[Vocabulary] Update Vocabulary',
  props<{ vocabulary: Vocabulary }>()
);

export const updateVocabularySuccess = createAction(
  '[Vocabulary] Update Vocabulary Success',
  props<{ vocabulary: Vocabulary }>()
);

export const updateVocabularyFailure = createAction(
  '[Vocabulary] Update Vocabulary Failure',
  props<{ error: any }>()
);

export const createVocabulary = createAction(
  '[Vocabulary] Create Vocabulary',
  props<{ vocabulary: Vocabulary }>()
);

export const createVocabularySuccess = createAction(
  '[Vocabulary] Create Vocabulary Success',
  props<{ vocabulary: Vocabulary }>()
);

export const createVocabularyFailure = createAction(
  '[Vocabulary] Create Vocabulary Failure',
  props<{ error: any }>()
);
