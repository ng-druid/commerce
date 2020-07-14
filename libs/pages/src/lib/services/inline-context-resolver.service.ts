import { Injectable } from '@angular/core';
import { InlineContext } from '../models/context.models';
import { ContextManagerService } from '@classifieds-ui/context';
import { Observable, of, forkJoin } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InlineContextResolverService {

  constructor(private contextManager: ContextManagerService) {}

  resolveGlobals(): Observable<any> {
    return forkJoin([
      ...this.contextManager.getAll(true).map(p => p.resolver.resolve(p, {}).pipe(
        map(res => [`_${p.name}`, res])
      ))
    ]).pipe(
      map(resolved => resolved.reduce<any>((p, [n, d]) => ({ ...p, [n]: d }), {}))
    )
  }

  resolveAll(contexts: Array<InlineContext>): Observable<any>  {
    return forkJoin([
      ...contexts.map(c => this.resolve(c).pipe(
        map(res => [c.name, res])
      ))
    ]).pipe(
      map(resolved => resolved.reduce<any>((p, [n, d]) => ({ ...p, [n]: d }), {}))
    );
  }

  resolveMerged(contexts: Array<InlineContext>): Observable<any> {
    return forkJoin([
      this.resolveGlobals(),
      this.resolveAll(contexts).pipe(
        map(res => {
          for(const n in res) {
            if(Array.isArray(res[n])) {
              res[n] = res[n].length > 0 ? res[n][0] : undefined;
            }
          }
          return res;
        }),
        defaultIfEmpty({})
      )
    ]).pipe(
      map(([g, ng]) => ({ ...g, ...ng }), {})
    );
  }

  resolve(context: InlineContext): Observable<any> {
    if(context.plugin) {
      const plugin = this.contextManager.lookupContext(context.plugin);
     return plugin.resolver.resolve(plugin, this.getDataObject(context));
    } else {
      return of(this.getDataObject(context));
    }
  }

  getDataObject(context: InlineContext): any {
    switch(context.adaptor) {
      case 'rest':
        return context.rest;
      case 'snippet':
        return context.snippet;
      case 'json':
        return JSON.parse(context.snippet.content);
      case 'data':
        return context.data;
      case 'token':
        return context.tokens;
      default:
        return undefined;
    }
  }

}
