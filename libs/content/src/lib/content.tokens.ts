import { InjectionToken } from '@angular/core';

import { ContentProvider } from './models/content.models';

export const CONTENT_PROVIDER = new InjectionToken<ContentProvider>('ContentProvider');
