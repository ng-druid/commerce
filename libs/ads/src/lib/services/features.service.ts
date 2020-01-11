import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FeaturesSearchConfig, FeatureListItem } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  constructor(private config: DefaultDataServiceConfig, private http: HttpClient) { }
  getFeatures(searchConfig: FeaturesSearchConfig): Observable<Array<FeatureListItem>> {
    return this.http.get<Array<FeatureListItem>>(`${this.config.root}/featurelistitems/`, { params: { ...searchConfig } }).pipe(
      map(data => data.map(d => new FeatureListItem(d)))
    );
  }
}
