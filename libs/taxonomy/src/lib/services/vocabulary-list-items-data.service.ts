import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { VocabularyListItem } from '../models/taxonomy.models';

@Injectable({
  providedIn: 'root'
})
export class VocabularyListItemsDataService extends DefaultDataService<VocabularyListItem> {
  private goApi = 'https://p1vgub4jtb.execute-api.us-east-1.amazonaws.com/taxonomy';
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('VocabularyListItem', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${this.goApi}/vocabularylistitems`;
  }
}
