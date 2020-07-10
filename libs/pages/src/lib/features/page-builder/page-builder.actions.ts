import { createAction, props } from '@ngrx/store';
import { ContentInstance } from '@classifieds-ui/content';
import { Rest, Dataset } from '../../models/datasource.models';

export const addContentInstance = createAction(
  '[PageBuilder] Add Content Instance',
  props<{ contentInstance: ContentInstance }>()
);

export const loadRestData = createAction(
  '[PageBuilder] Load Rest Data',
  props<{ tag: string; rest: Rest }>()
);

export const loadRestDataSuccess = createAction(
  '[PageBuilder] Load Rest Data Success',
  props<{ tag: string, data: Dataset }>()
);

export const loadRestDataError = createAction(
  '[PageBuilder] Load Rest Data Error',
  props<{ tag: string }>()
);




