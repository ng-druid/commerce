import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as PageBuilderActions from './page-builder.actions';


@Injectable()
export class PageBuilderEffects {
  constructor(private actions$: Actions) {}

}
