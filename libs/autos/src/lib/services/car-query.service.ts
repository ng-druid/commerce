import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Make, Model } from '../models/carquery.models';

@Injectable({
  providedIn: 'root'
})
export class CarQueryService {
  private baseUrl = 'https://localhost:44340/carquery/api/0.3/';
  constructor(private http: HttpClient) { }
  getYears() : Observable<Array<number>> {
    return this.http.jsonp(`${this.baseUrl}?cmd=getYears&callback=callback`, 'callback').pipe(
      map((r: any) => Array(+r.Years.max_year - (+r.Years.max_year - +r.Years.min_year)).fill('').map((v, idx) => +r.Years.max_year - idx) as Array<number>)
    );
  }
  getMakes(year: number): Observable<Array<Make>> {
    return this.http.jsonp(`${this.baseUrl}?cmd=getMakes&callback=callback&year=${year}&sold_in_us=1`, 'callback').pipe(
      map((r: any) => r.Makes.map((m: any) => new Make({
        id: m.make_id,
        display: m.make_display,
        common: m.make_is_common,
        country: m.make_country
      })))
    );
  }
  getModels(year: number, make: string): Observable<Array<Model>> {
    return this.http.jsonp(`${this.baseUrl}?cmd=getModels&callback=callback&make=${make}&year=${year}&sold_in_us=1`, 'callback').pipe(
      map((r: any) => r.Models.map((m: any) => new Model({
        name: m.model_name,
        makeId: m.model_make_id
      })))
    );
  }
}
