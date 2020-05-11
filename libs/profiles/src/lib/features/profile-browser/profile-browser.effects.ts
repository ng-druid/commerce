import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as ProfileBrowserActions from './profile-browser.actions';


@Injectable()
export class ProfileBrowserEffects {
  constructor(private actions$: Actions) {}
}
