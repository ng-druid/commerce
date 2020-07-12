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
      map(route => [route, url, url.indexOf('?')]),
      map(([route, url, index]) => [route, (index > -1 ? url.substring(0, index) : url), (index > -1 ? url.substring(index + 1) : '')]),
      map(([route, path, queryString]) => {
        console.log(route);
        const qsParsed = qs.parse(queryString);
        const qsOverrides = {};
        const pathPieces = path.split('/');
        const len = pathPieces.length;
        const rebuildUrl = [];
        const newMeta = new Map<string, any>([ ...metadata, ['_route', route] ]);
        let pathParams = 0;
        for(let i = 0; i < len; i++) {
          if(pathPieces[i].indexOf(':') > -1) {
            rebuildUrl.push(this.paramValue(params[pathParams], newMeta));
            pathParams++;
          } else {
            rebuildUrl.push(pathPieces[i]);
          }
        }
        for(const prop in qsParsed) {
          if(qsParsed[prop].indexOf(':') > -1) {
            qsOverrides[prop] = this.paramValue(params[pathParams], newMeta);
            pathParams++;
          }
        }
        const apiUrl = rebuildUrl.join('/') + (queryString !== '' ? '?' + qs.stringify({ ...qsParsed, ...qsOverrides }) : '');
        return apiUrl;
      })
    );
  }

  paramName(url: string, index: number): string {
    const indexPos = url.indexOf('?');
    const pathParsed = ((indexPos > -1 ? url.substring(0, indexPos) : url) as string).split('/').reduce<any>((p, c, i) => (c.indexOf(':') === 0 ? { ...p, [c.substr(1)]: c } : p ), {});
    const parsed = { ...pathParsed, ...qs.parse(url.substring(url.indexOf('?') + 1)) };
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
    } else if(param.flags.findIndex(f => f.enabled) > -1 && metadata.has('searchString')) {
      return `${metadata.get('searchString')}`;
    } else if(param.mapping.type === 'route') {
      return route.params[param.mapping.value];
    } else if(param.mapping.type === 'querystring') {
      return route.queryParams[param.mapping.value];
    } else {
      return param.mapping.value;
    }
  }

}
