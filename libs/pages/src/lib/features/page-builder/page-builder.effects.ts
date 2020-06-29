import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as PageBuilderActions from './page-builder.actions';
import { DatasourceApiService } from '../../services/datasource-api.service';
import { Dataset } from '../../models/datasource.models';


@Injectable()
export class PageBuilderEffects {
  loadRestData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageBuilderActions.loadRestData),
      concatMap(p => this.datasourceApi.getData(p.rest.url).pipe(
        map(results => PageBuilderActions.loadRestDataSuccess({ tag: p.tag, data: new Dataset({ results }) }))
      ))
    )
  );
  constructor(private actions$: Actions, private datasourceApi: DatasourceApiService) {}
}
