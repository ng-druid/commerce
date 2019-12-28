import { createAction, props } from '@ngrx/store';
import { Vocabulary } from '@classifieds-ui/taxonomy';

export const loadVocabularies = createAction(
  '[Vocabularies] Load Vocabularies'
);

export const loadVocabulariesSuccess = createAction(
  '[Vocabularies] Load Vocabularies Success',
  props<{ vocabularies: Vocabulary[] }>()
);

export const loadVocabulariesFailure = createAction(
  '[Vocabularies] Load Vocabularies Failure',
  props<{ error: any }>()
);
