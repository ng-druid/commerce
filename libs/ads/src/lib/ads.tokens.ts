import { InjectionToken } from '@angular/core';

import { AdsSettings } from './models/ads.models';

export const ADS_SETTINGS = new InjectionToken<AdsSettings>('Ads Settings');
