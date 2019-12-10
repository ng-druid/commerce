import { InjectionToken } from '@angular/core';

import { CitiesSettings } from './models/cities.models';

export const CITIES_SETTINGS = new InjectionToken<CitiesSettings>('Cities Settings');
