import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPageBuilder from './page-builder.reducer';

export const selectPageBuilderState = createFeatureSelector<fromPageBuilder.State>(
  fromPageBuilder.pageBuilderFeatureKey
);

export const selectContentInstance = createSelector(selectPageBuilderState, state => state.contentInstance);

export const selectDataset = (tag: string) => createSelector(selectPageBuilderState, state => {
  const index = state.dataTags.findIndex(t => t === tag);
  if(index > -1) {
    return state.datasets[index][state.datasets[index].length - 1];
  } else {
    return undefined;
  }
});

export const selectPageInfo = createSelector(selectPageBuilderState, state => state.pageInfo);
