import { InjectionToken } from '@angular/core';

import { ProfileSettings } from './models/profiles.model';

export const PROFILE_SETTINGS = new InjectionToken<ProfileSettings>('Profile Settings');
