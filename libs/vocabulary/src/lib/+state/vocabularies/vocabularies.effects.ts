import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { TaxonomyService } from '@classifieds-ui/taxonomy';
import { map } from 'rxjs/operators';

import * as fromVocabularies from './vocabularies.reducer';
import * as VocabulariesActions from './vocabularies.actions';

@Injectable()
export class VocabulariesEffects {
  loadVocabularies$ = createEffect(() =>
    this.dataPersistence.fetch(VocabulariesActions.loadVocabularies, {
      run: (
        action: ReturnType<typeof VocabulariesActions.loadVocabularies>,
        state: fromVocabularies.VocabulariesPartialState
      ) => {
        return this.taxonomyService.getVocabularies().pipe(
          map(vocabs => VocabulariesActions.loadVocabulariesSuccess({
            vocabularies: vocabs
          }))
        );
      },

      onError: (
        action: ReturnType<typeof VocabulariesActions.loadVocabularies>,
        error
      ) => {
        console.error('Error', error);
        return VocabulariesActions.loadVocabulariesFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private taxonomyService: TaxonomyService,
    private dataPersistence: DataPersistence<
      fromVocabularies.VocabulariesPartialState
    >
  ) {}
}
