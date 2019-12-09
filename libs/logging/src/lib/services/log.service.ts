import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggingSettings } from '../models/logging.models';
import { LOGGING_SETTINGS } from '../logging.tokens';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(@Inject(LOGGING_SETTINGS) private loggingSettings: LoggingSettings, private http: HttpClient) { }
  log(data: any): Observable<void> {
    console.log(data);
    return of();
    /*return this.http.post(`${this.loggingSettings.endpointUrl}/log`, {}).pipe(map(r => {
      return undefined;
    }));*/
  }
}
