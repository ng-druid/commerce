import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { ChatConversation } from '../models/chat.models';

@Injectable({
  providedIn: 'root'
})
export class ChatConversationsDataService extends DefaultDataService<ChatConversation> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('ChatConversation', http, httpUrlGenerator, { ...config, root: `${config.root}/chat` });
  }
}
