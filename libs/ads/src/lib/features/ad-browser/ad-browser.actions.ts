import { createAction, props } from '@ngrx/store';

export const setAdType = createAction(
  '[AdBrowser] Set Ad Type',
  props<{ adType: string }>()
);




