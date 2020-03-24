import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityListItem } from '../models/cities.models';

@Injectable({
  providedIn: 'root'
})
export class ZippoService {
  zippoBaseUrl = 'https://localhost:44340/zippo/';
  constructor(private http: HttpClient) { }
  getWithQuery(query: { searchString: string }): Observable<Array<CityListItem>> {
    if(!query.searchString || !query.searchString.indexOf || query.searchString.indexOf(',') < 3) {
      return of([]);
    }
    const [city, state] = query.searchString.split(',').map(v => v.trim());
    if(!city || !state || city.length === 0 || state.length !== 2) {
      return of([]);
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
