import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { VocabularyListItem } from '../models/taxonomy.models';

@Injectable({
  providedIn: 'root'
})
export class VocabularyListItemsDataService extends DefaultDataService<VocabularyListItem> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('VocabularyListItem', http, httpUrlGenerator, { ...config, root: `${config.root}/taxonomy` });
  }
}
