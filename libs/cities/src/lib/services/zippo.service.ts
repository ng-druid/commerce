import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityListItem } from '../models/cities.models';
import { states } from '../data/states.data';

@Injectable({
  providedIn: 'root'
})
export class ZippoService {
  zippoBaseUrl = `${this.config.root}/cities/`;
  constructor(private http: HttpClient, private config: DefaultDataServiceConfig) { }
  getWithQuery(query: { searchString: string }): Observable<Array<CityListItem>> {
    if(!query.searchString || !query.searchString.indexOf || query.searchString.indexOf(',') < 3) {
      return of([]);
    }
    let [city, state] = query.searchString.split(',').map(v => v.trim());
    if(!city || !state || city.length === 0) {
      return of([]);
    }
    if(state && state.length !== 2) {
      for(const prop in states) {
        if(states[prop] === state.trim()) {
          state = prop;
          break;
        }
      }
    }
    if(!state || state.length !== 2) {
      return of();
    }
    return this.findByCity(state, city);
  }
  findByCity(state: string, city: string): Observable<Array<CityListItem>> {
    return this.http.get(`${this.zippoBaseUrl}us/${state}/${city}`).pipe(
      map((res: any) => res.places.map((p: any) => new CityListItem({
        sourceId: '',
        city: res['place name'],
        stateId: res['state abbreviation'],
        stateName: res['state'],
        countyName: res['country'],
        population: 0,
        zip: p['post code'],
        location: [parseFloat(p.longitude), parseFloat(p.latitude)]
      })))
    );
  }
}
