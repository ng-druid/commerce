import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { Vocabulary } from '../../models/taxonomy.models';
import { TaxonomyService } from '../../services/taxonomy.service';
import { VocabularyEditComponent } from '../../components/vocabulary-edit/vocabulary-edit.component';

import * as fromVocabulary from './vocabulary.reducer';
import * as VocabularyActions from './vocabulary.actions';

@Injectable()
export class VocabularyEffects {
  loadVocabulary$ = createEffect(() =>
    this.dataPersistence.fetch(VocabularyActions.loadVocabulary, {
      run: (
        action: ReturnType<typeof VocabularyActions.loadVocabulary>,
        state: fromVocabulary.VocabularyPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return VocabularyActions.loadVocabularySuccess({ vocabulary: new Vocabulary() });
      },

      onError: (
        action: ReturnType<typeof VocabularyActions.loadVocabulary>,
        error
      ) => {
        console.error('Error', error);
        return VocabularyActions.loadVocabularyFailure({ error });
      }
    })
  );

  loadVocabularyByRoute$ = createEffect(() =>
    this.dataPersistence.navigation(VocabularyEditComponent, {
      run: (a: ActivatedRouteSnapshot, state: fromVocabulary.VocabularyPartialState) => {
        return this.taxonomyService.getVocabulary(a.params['vocabularyId']).pipe(
          map(v => VocabularyActions.loadVocabularySuccess({
            vocabulary: v
          }))
        );
      },
      onError: () => {

      }
    })
  );

  updateVocabulary$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(VocabularyActions.updateVocabulary, {
      run: (
        a: ReturnType<typeof VocabularyActions.updateVocabulary>,
        state: fromVocabulary.VocabularyPartialState
      ) => {
        return this.taxonomyService.updateVocabulary(a.vocabulary).pipe(
          map(v => VocabularyActions.updateVocabularySuccess({
            vocabulary: v
          }))
        );
      },
      onError: (
        a: ReturnType<typeof VocabularyActions.updateVocabulary>,
        e: any
      ) => {
      }
    })
  );

  createVocabulary$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(VocabularyActions.createVocabulary, {
      run: (
        a: ReturnType<typeof VocabularyActions.createVocabulary>,
        state: fromVocabulary.VocabularyPartialState
      ) => {
        return this.taxonomyService.createVocabulary(a.vocabulary).pipe(
          map(v => VocabularyActions.createVocabularySuccess({
            vocabulary: v
          }))
        );
      },
      onError: (
        a: ReturnType<typeof VocabularyActions.createVocabulary>,
        e: any
      ) => {
      }
    })
  );

  constructor(
    private actions$: Actions,
    private taxonomyService: TaxonomyService,
    private dataPersistence: DataPersistence<
      fromVocabulary.VocabularyPartialState
    >
  ) {}
}
