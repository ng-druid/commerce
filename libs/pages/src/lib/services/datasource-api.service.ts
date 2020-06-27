import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatasourceApiService {
  constructor(private config: DefaultDataServiceConfig, private http: HttpClient) { }
  getData(url: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.config.root}${url}`)/*.pipe(
      map(data => Object.assign(new c(), data))
    );*/
  }
}
