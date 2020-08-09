import { Action, createReducer, on } from '@ngrx/store';
import * as PageBuilderActions from './page-builder.actions';
import { ContentInstance } from '@classifieds-ui/content';
import { Dataset } from '../../models/datasource.models';
import { PanelPageStateSlice } from '../../models/page.models';

export const pageBuilderFeatureKey = 'pageBuilder';

export interface State {
  contentInstance: ContentInstance
  dataTags: Array<string>,
  datasets: Array<Array<Dataset>>,
  pageInfo: PanelPageStateSlice
}

export interface PageBuilderPartialState {
  readonly [pageBuilderFeatureKey]: State;
}

export const initialState: State = {
  contentInstance: undefined,
  dataTags: [],
  datasets: [],
  pageInfo: undefined
};

const pageBuilderReducer = createReducer(
  initialState,
  on(PageBuilderActions.loadRestDataSuccess, (state, action) => {
    const tagIndex = state.dataTags.findIndex(t => t === action.tag);
    if(tagIndex > -1 && state[tagIndex] !== undefined) {
      const newState = { ...state };
      newState[tagIndex].push(action.data);
      return newState;
    } else {
      return { ...state, dataTags: [ ...state.dataTags, action.tag ], datasets: [ ...state.datasets, [ action.data ] ] };
    }
  }),
  on(PageBuilderActions.addContentInstance, (state, action) => ({ ...state, contentInstance: action.contentInstance })),
  on(PageBuilderActions.setPageInfo, (state, action ) => {
    return ({ ...state, pageInfo: action.info !== undefined ? new PanelPageStateSlice(action.info) : undefined });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return pageBuilderReducer(state, action);
}
