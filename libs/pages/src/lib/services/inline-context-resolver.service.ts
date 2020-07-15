import { Injectable } from '@angular/core';
import { InlineContext } from '../models/context.models';
import { ContextManagerService } from '@classifieds-ui/context';
import { Observable, of, forkJoin, Subject, iif } from 'rxjs';
import { map, defaultIfEmpty, distinctUntilChanged, debounceTime, take, tap, switchMap, startWith, subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InlineContextResolverService {

  constructor(private contextManager: ContextManagerService) {}

  resolveGlobals(): Observable<any> {
    let state: any;
    const sub$ = new Subject<any>();
    return forkJoin([
      ...this.contextManager.getAll(true).map(p => p.resolver.resolve(p, {}).pipe(
        take(1),
        map(res => [`_${p.name}`, res])
      ))
    ]).pipe(
      map(resolved => resolved.reduce<any>((p, [n, d]) => ({ ...p, [n]: d }), {})),
      tap(c => state = c),
      switchMap(c => {
        this.contextManager.getAll(true).forEach(p => p.resolver.resolve(p, {}).pipe(
          map(res => [`_${p.name}`, res])
        ).subscribe(([n, res]) => {
          state = { ...state, [n]: res };
          sub$.next(state);
        }));
        return sub$.pipe(
          startWith(c),
          debounceTime(100),
          distinctUntilChanged()
        );
      })
    );
  }

  resolveAll(contexts: Array<InlineContext>): Observable<any>  {
    let state: any;
    const sub$ = new Subject<any>();
    return forkJoin([
      ...contexts.map(c => this.resolve(c).pipe(
        take(1),
        map(res => [c.name, res]),
      ))
    ]).pipe(
      map(resolved => resolved.reduce<any>((p, [n, d]) => ({ ...p, [n]: d }), {})),
      tap(c => state = c),
      switchMap(c => {
        console.log('resolve all');
        contexts.forEach(c => this.resolve(c).pipe(
          map(res => [c.name, res])
        ).subscribe(([n, res]) => {
          state = { ...state, [n]: res };
          sub$.next(state);
        }));
        return sub$.pipe(
          startWith(c),
          debounceTime(100),
          distinctUntilChanged()
        );
      })
    );
  }

  resolveMerged(contexts: Array<InlineContext>): Observable<any> {
    let state: any;
    const sub$ = new Subject<any>();
    return forkJoin([
      new Observable<any>(obs => {
        this.resolveGlobals().pipe(
          take(1)
        ).subscribe(v => {
          obs.next(v);
          obs.complete();
        })
      }),
      new Observable<any>(obs => {
        if(contexts.length !== 0) {
          this.resolveAll(contexts).pipe(
            map(res => {
              console.log('mapping merged resolved');
              for(const n in res) {
                if(Array.isArray(res[n])) {
                  res[n] = res[n].length > 0 ? res[n][0] : undefined;
                }
              }
              return res;
            }),
            take(1)
          ).subscribe(v => {
            obs.next(v);
            obs.complete();
          })
        } else {
          obs.next({});
          obs.complete();
        }
      })
    ]).pipe(
      map(([g, ng]) => ({ ...g, ...ng }), {}),
      tap(c => state = c),
      switchMap(c => {
        this.resolveGlobals().subscribe(v => {
          state = { ...state, ...v };
          sub$.next(state);
        });
        if(contexts.length !== 0) {
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
          ).subscribe(res => {
            state = { ...state, ...res };
            sub$.next(state);
          });
        }
        return sub$.pipe(
          startWith(c),
          debounceTime(100),
          distinctUntilChanged()
        );
      })
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
