import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TAXONOMY_SETTINGS } from '../taxonomy.tokens';
import { TaxonomySettings, Vocabulary } from '../models/taxonomy.models';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {
  constructor(@Inject(TAXONOMY_SETTINGS) private settings: TaxonomySettings, private http: HttpClient) { }
  getVocabulary(vocabId: string): Observable<Vocabulary > {
    return this.http.get<Vocabulary>(`${this.settings.endpointUrl}/vocabularies/${vocabId}`).pipe(map(v => new Vocabulary(v)));
  }
}
