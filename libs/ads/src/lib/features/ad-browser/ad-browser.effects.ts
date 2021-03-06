import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as AdBrowserActions from './ad-browser.actions';


@Injectable()
export class AdBrowserEffects {


  /*loadAdBrowsers$ = createEffect(() => this.actions$.pipe(
    ofType(AdBrowserActions.loadAdBrowsers),
    // An EMPTY observable only emits completion. Replace with your own observable API request
    concatMap(() => EMPTY)
  ));*/


  constructor(private actions$: Actions) {}

}
