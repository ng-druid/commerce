import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPageBuilder from './page-builder.reducer';

export const selectPageBuilderState = createFeatureSelector<fromPageBuilder.State>(
  fromPageBuilder.pageBuilderFeatureKey
);

export const selectContentInstance = createSelector(selectPageBuilderState, state => state.contentInstance);
