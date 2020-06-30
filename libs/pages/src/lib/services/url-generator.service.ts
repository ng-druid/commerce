import { Injectable } from '@angular/core';
import { Param } from '../models/datasource.models';
import { Observable, of } from 'rxjs';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  constructor() { }

  generateUrl(url, params: Array<Param>, metadata: Map<string, any>): Observable<string> {
    if(url.indexOf('?') === -1) {
      return url;
    }
    const parsed = qs.parse(url.substring(url.indexOf('?') + 1));
    const params2 = params.reduce<any>((p, c, i) => ({ ...p, [this.paramName(url, i)]: this.paramValue(c, metadata) }), {});
    const apiUrl = url.substring(0, url.indexOf('?') + 1) + qs.stringify({ ...parsed, ...params2 });
    return of(apiUrl);
  }

  paramName(url: string, index: number): string {
    const parsed = qs.parse(url.substring(url.indexOf('?') + 1));
    let i = 0;
    for(const param in parsed) {
      if(parsed[param].indexOf(':') === 0) {
        if(i === index) {
          return param;
        }
        i++;
      }
    }
  }

  paramValue(param: Param, metadata: Map<string, any>): string {
    if(param.flags.findIndex(f => f.enabled) > -1 && metadata.has('page')) {
      return `${metadata.get('page')}`;
    } else {
      return param.mapping.value;
    }
  }

}
