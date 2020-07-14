import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { ContentInstance } from '@classifieds-ui/content';

import { PageBuilderPartialState } from './page-builder.reducer';
import { selectContentInstance, selectPageInfo } from './page-builder.selectors';
import * as pageBuilderActions from './page-builder.actions';
import { Rest } from '../../models/datasource.models';
import { PanelPageStateSlice } from '../../models/page.models';

@Injectable({
  providedIn: 'root'
})
export class PageBuilderFacade {
  getContentInstance$ = this.store.pipe(select(selectContentInstance));
  getPageInfo$ = this.store.pipe(select(selectPageInfo));
  constructor(private store: Store<PageBuilderPartialState>) {}
  addContentInstance(contentInstance: ContentInstance) {
    this.store.dispatch(pageBuilderActions.addContentInstance({ contentInstance }));
  }
  loadRestData(tag: string, rest: Rest) {
    this.store.dispatch(pageBuilderActions.loadRestData({ tag, rest }));
  }
  setPageInfo(info: PanelPageStateSlice) {
    this.store.dispatch(pageBuilderActions.setPageInfo({ info }));
  }
}
