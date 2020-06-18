import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { ContentInstance } from '@classifieds-ui/content';

import { PageBuilderPartialState } from './page-builder.reducer';
import { selectContentInstance } from './page-builder.selectors';
import * as pageBuilderActions from './page-builder.actions';

@Injectable({
  providedIn: 'root'
})
export class PageBuilderFacade {
  getContentInstance$ = this.store.pipe(select(selectContentInstance));
  constructor(private store: Store<PageBuilderPartialState>) {}
  addContentInstance(contentInstance: ContentInstance) {
    this.store.dispatch(pageBuilderActions.addContentInstance({ contentInstance }));
  }
}
