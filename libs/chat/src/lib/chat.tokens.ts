import { InjectionToken } from '@angular/core';

import { ChatSettings } from './models/chat.models';

export const CHAT_SETTINGS = new InjectionToken<ChatSettings>('ChatSettings');
