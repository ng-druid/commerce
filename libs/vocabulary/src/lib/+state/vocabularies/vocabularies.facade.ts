import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromVocabularies from './vocabularies.reducer';
import * as VocabulariesSelectors from './vocabularies.selectors';
import * as VocabulariesActions from './vocabularies.actions';

@Injectable()
export class VocabulariesFacade {
  loaded$ = this.store.pipe(
    select(VocabulariesSelectors.getVocabulariesLoaded)
  );
  allVocabularies$ = this.store.pipe(
    select(VocabulariesSelectors.getAllVocabularies)
  );
  selectedVocabularies$ = this.store.pipe(
    select(VocabulariesSelectors.getSelected)
  );

  constructor(
    private store: Store<fromVocabularies.VocabulariesPartialState>
  ) {}

  loadVocabularies() {
    this.store.dispatch(VocabulariesActions.loadVocabularies());
  }

}
