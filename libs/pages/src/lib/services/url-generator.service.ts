import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import { Param } from '../models/datasource.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  constructor(private routerStore: Store<RouterReducerState>) {}

  generateUrl(url, params: Array<Param>, metadata: Map<string, any>): Observable<string> {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    return this.routerStore.pipe(
      select(selectCurrentRoute),
      map(route => {
        if(url.indexOf('?') === -1) {
          return url;
        }
        const parsed = qs.parse(url.substring(url.indexOf('?') + 1));
        const params2 = params.reduce<any>((p, c, i) => ({ ...p, [this.paramName(url, i)]: this.paramValue(c, new Map<string, any>([ ...metadata, ['_route', route] ])) }), {});
        const apiUrl = url.substring(0, url.indexOf('?') + 1) + qs.stringify({ ...parsed, ...params2 });
        return apiUrl;
      })
    );
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
    const route = metadata.get('_route') as ActivatedRoute;
    if(param.flags.findIndex(f => f.enabled) > -1 && metadata.has('page')) {
      return `${metadata.get('page')}`;
    } else if(param.mapping.type === 'route') {
      return route.params[param.mapping.value];
    } else if(param.mapping.type === 'querystring') {
      return route.queryParams[param.mapping.value];
    } else {
      return param.mapping.value;
    }
  }

}
