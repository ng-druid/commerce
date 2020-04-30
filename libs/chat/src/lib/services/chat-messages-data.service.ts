import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { ChatMessage } from '../models/chat.models';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesDataService extends DefaultDataService<ChatMessage> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('ChatMessage', http, httpUrlGenerator, { ...config, root: `${config.root}/chat` });
  }
}
