import { createAction, props } from '@ngrx/store';
import { Profile } from '../../models/profiles.model';

export const setProfile = createAction(
  '[ProfileBrowser] Set Profile',
  props<{ profile: Profile }>()
);




