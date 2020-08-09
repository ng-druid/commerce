import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import { Param } from '../models/datasource.models';
import { InlineContext } from '../models/context.models';
import { Observable, of, forkJoin, iif } from 'rxjs';
import { map, switchMap, defaultIfEmpty, take } from 'rxjs/operators';
import { InlineContextResolverService } from './inline-context-resolver.service';
import { TokenizerService } from '@classifieds-ui/token';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class UrlGeneratorService {

  constructor(
    private routerStore: Store<RouterReducerState>,
    private inlineContextResolver: InlineContextResolverService,
    private tokenizerService: TokenizerService
  ) {}

  generateUrl(url, params: Array<Param>, metadata: Map<string, any>): Observable<string> {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    return this.routerStore.pipe(
      select(selectCurrentRoute),
      map(route => [route, url, url.indexOf('?')]),
      map(([route, url, index]) => [route, (index > -1 ? url.substring(0, index) : url), (index > -1 ? url.substring(index + 1) : '')]),
      switchMap(([route, path, queryString]) => {
        const qsParsed = qs.parse(queryString);
        const pathPieces: Array<string> = path.split('/');
        const meta = new Map<string, any>([ ...metadata, ['_route', route] ]);
        const paramNames = this.paramNames(url);
        const mappings = params.reduce<Map<string, Param>>((p, c, i) => new Map([ ...p, [paramNames[i], c ] ]), new Map<string, Param>());
        const path$ = pathPieces.reduce<Array<Observable<string>>>((p, c, i) => {
          if(c.indexOf(':') > -1) {
            return [ ...p, this.paramValue(mappings.get(c.substr(1)), meta)];
          } else {
            return [ ...p, of(pathPieces[i])];
          }
        }, []);
        const qs$: Array<Observable<[string, any]>> = [];
        for(const prop in qsParsed) {
          if(typeof(qsParsed[prop]) === 'string' && qsParsed[prop].indexOf(':') > -1) {
            qs$.push(this.paramValue(mappings.get(qsParsed[prop].substr(1)), meta).pipe(map(v => [prop, v])));
          }
        }
        return forkJoin([
          forkJoin(path$).pipe(
            map(p => p.join('/')),
            defaultIfEmpty(path)
          ),
          forkJoin(qs$).pipe(
            map(q => q.reduce((p, [n, v]) => ({ ...p, [n]: v }), qsParsed)),
            map(q => qs.stringify(q)),
            defaultIfEmpty(queryString)
          )
        ]).pipe(
          map(r => r.join('?')),
        );
      })
    );
  }

  paramNames(url: string): Array<string> {
    const indexPos = url.indexOf('?');
    const pathParsed = ((indexPos > -1 ? url.substring(0, indexPos) : url) as string).split('/').reduce<any>((p, c, i) => (c.indexOf(':') === 0 ? { ...p, [c.substr(1)]: c } : p ), {});
    const parsed = { ...pathParsed, ...qs.parse(url.substring(url.indexOf('?') + 1)) };
    const paramNames = [];
    for(const param in parsed) {
      if(parsed[param].indexOf(':') === 0) {
        paramNames.push(param);
      }
    }
    return paramNames;
  }

  paramValue(param: Param, metadata: Map<string, any>): Observable<string> {
    const route = metadata.get('_route') as ActivatedRoute;
    if(param.flags.findIndex(f => f.enabled) > -1 && metadata.has('page')) {
      return of(`${metadata.get('page')}`);
    } else if(param.flags.findIndex(f => f.enabled) > -1 && metadata.has('searchString')) {
      return of(`${metadata.get('searchString')}`);
    } else if(param.mapping.type === 'route') {
      return of(route.params[param.mapping.value]);
    } else if(param.mapping.type === 'querystring') {
      return of(route.queryParams[param.mapping.value]);
    } else if(param.mapping.type === 'context') {
      const ctx = new InlineContext(metadata.get('contexts').find(c => c.name === param.mapping.context));
      return this.inlineContextResolver.resolve(ctx).pipe(
        take(1),
        switchMap(d => iif(
          () => param.mapping.value && param.mapping.value !== '',
          of(d).pipe(
            map(d => this.tokenizerService.generateGenericTokens(d[0])),
            map(tokens => this.tokenizerService.replaceTokens(`[${param.mapping.value}]`, tokens)),
            take(1)
          ),
          of(d[0]).pipe(
            take(1)
          )
        ))
      );
    } else {
      return of(param.mapping.value);
    }
  }

}
