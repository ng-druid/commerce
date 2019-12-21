import { InjectionToken } from '@angular/core';

import { TaxonomySettings } from './models/taxonomy.models';

export const TAXONOMY_SETTINGS = new InjectionToken<TaxonomySettings>('Taxonomy Settings');
