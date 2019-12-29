import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { select, Store, Action } from '@ngrx/store';

import { Vocabulary } from '../../models/taxonomy.models';

import * as fromVocabulary from './vocabulary.reducer';
import * as VocabularySelectors from './vocabulary.selectors';
import * as VocabularyActions from './vocabulary.actions';

@Injectable({
  providedIn: 'root'
})
export class VocabularyFacade {
  loaded$ = this.store.pipe(select(VocabularySelectors.getVocabularyLoaded));
  allVocabulary$ = this.store.pipe(
    select(VocabularySelectors.getAllVocabulary)
  );
  selectedVocabulary$ = this.store.pipe(
    select(VocabularySelectors.getSelected)
  );

  constructor(private store: Store<fromVocabulary.VocabularyPartialState>) {}

  loadVocabulary(id: string) {
    this.store.dispatch(VocabularyActions.loadVocabulary({ id }));
  }

  getVocabulary(id: string): Observable<Vocabulary> {
    return this.allVocabulary$.pipe(map(vocabs => vocabs.find(v => v.id === id)));
  }

}
