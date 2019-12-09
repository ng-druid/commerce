import { InjectionToken } from '@angular/core';

import { LoggingSettings } from './models/logging.models';

export const LOGGING_SETTINGS = new InjectionToken<LoggingSettings>('LoggingSettings');
