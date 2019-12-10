import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CitiesSettings, City } from '../models/cities.models';
import { CITIES_SETTINGS } from '../cities.tokens';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(@Inject(CITIES_SETTINGS) private citiesSettings: CitiesSettings, private http: HttpClient) { }
  getCities(searchString: string): Observable<Array<City>> {
    return this.http.get<Array<City>>(`${this.citiesSettings.endpointUrl}/cities`, { params: { searchString } }).pipe(
      map(r => {
        return r.map(c => new City(c));
      })
    );
  }
}
