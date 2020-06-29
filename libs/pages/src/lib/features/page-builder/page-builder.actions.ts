import { createAction, props } from '@ngrx/store';
import { ContentInstance } from '@classifieds-ui/content';
import { Rest } from '../../models/datasource.models';

export const addContentInstance = createAction(
  '[PageBuilder] Add Content Instance',
  props<{ contentInstance: ContentInstance }>()
);

export const loadRestData = createAction(
  '[PageBuilder] Load Rest Data',
  props<{ tag: string; rest: Rest }>()
);




