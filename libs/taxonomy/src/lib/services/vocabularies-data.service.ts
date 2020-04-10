import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { Vocabulary } from '../models/taxonomy.models';

@Injectable({
  providedIn: 'root'
})
export class VocabulariesDataService extends DefaultDataService<Vocabulary> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Vocabulary', http, httpUrlGenerator, { ...config, root: `${config.root}/taxonomy` });
  }
}
