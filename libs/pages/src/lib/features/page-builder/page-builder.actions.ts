import { createAction, props } from '@ngrx/store';
import { ContentInstance } from '@classifieds-ui/content';

export const addContentInstance = createAction(
  '[PageBuilder] Add Content Instance',
  props<{ contentInstance: ContentInstance }>()
);




