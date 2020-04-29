import { InjectionToken } from '@angular/core';

import { AdTypePlugin, AdSettings } from './models/ads.models';

export const AD_SETTINGS = new InjectionToken<AdSettings>('Ad Settings');
export const AD_TYPE_PLUGIN = new InjectionToken<AdTypePlugin>('AdTypePlugin');
