import { Action, createReducer, on } from '@ngrx/store';
import * as PageBuilderActions from './page-builder.actions';
import { ContentInstance } from '@classifieds-ui/content';
import { Dataset } from '../../models/datasource.models';

export const pageBuilderFeatureKey = 'pageBuilder';

export interface State {
  contentInstance: ContentInstance
  datasets: Map<string, Array<Dataset>>
}

export interface PageBuilderPartialState {
  readonly [pageBuilderFeatureKey]: State;
}

export const initialState: State = {
  contentInstance: undefined,
  datasets: new Map<string, Array<Dataset>>()
};

const pageBuilderReducer = createReducer(
  initialState,
  on(PageBuilderActions.addContentInstance, (state, action) => ({ ...state, contentInstance: action.contentInstance })),
);

export function reducer(state: State | undefined, action: Action) {
  return pageBuilderReducer(state, action);
}
