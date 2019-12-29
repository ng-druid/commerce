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
