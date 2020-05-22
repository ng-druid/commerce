import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';
import { Observable } from 'rxjs';

import { TAXONOMY_SETTINGS } from '../taxonomy.tokens';
import { Vocabulary, TaxonomySettings } from '../models/taxonomy.models';

@Injectable({
  providedIn: 'root'
})
export class VocabulariesDataService extends DefaultDataService<Vocabulary> {
  private goApi = 'https://p1vgub4jtb.execute-api.us-east-1.amazonaws.com/taxonomy';
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger, @Inject(TAXONOMY_SETTINGS) private taxonomySettings: TaxonomySettings) {
    super('Vocabulary', http, httpUrlGenerator, config );
    this.entityUrl = this.entitiesUrl = `${this.goApi}/vocabulary`;
  }
  getById(key: number | string): Observable<Vocabulary> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }
    return this.execute('GET', `${this.taxonomySettings.vocabularyUrl}/${key}.json.gz`, err);
  }
}
