import { Injectable } from '@angular/core';
import { InlineContext } from '../models/context.models';
import { ContextManagerService } from '@classifieds-ui/context';
import { Observable, of, forkJoin, Subject, iif, concat, zip, combineLatest, merge} from 'rxjs';
import { map, defaultIfEmpty, distinctUntilChanged, debounceTime, take, tap, switchMap, startWith, reduce, combineAll, filter, scan } from 'rxjs/operators';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class InlineContextResolverService {

  constructor(private contextManager: ContextManagerService) {}

  resolveGlobals(tag = uuid.v4()): Observable<any> {
    /*let state: any;
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
          //debounceTime(100),
          distinctUntilChanged()
        );
      })
    );*/
   //const subject = new Subject();
    /*return combineLatest(this.contextManager.getAll(true).map(p => p.resolver.resolve(p, {}).pipe(
      map(res => ({ [`_${p.name}`]: res }))
    ))).pipe(
      debounceTime(0),
      map(v => v.reduce<any>((p, c) => ({ ...p, ...c }), {}))
    );*/
    const plugins = this.contextManager.getAll(true);
    return merge(
      ...plugins.map(p => p.resolver.resolve(p, {}).pipe(
        map(res => [p.name, res])
      ))
    ).pipe(
      //tap(([n, v]) => console.log(`change: ${n}`)),
      scan((acc, [n, v]) => new Map<string, any>([ ...acc, [`_${n}`, v] ]), new Map<string, any>([])),
      filter(v => v.size === plugins.length),
      map(v => Object.assign({}, ...[...v.entries()].map(([k, v]) => ({[k]: v}))))
    );
    /*return merge(...this.contextManager.getAll(true).map(p => p.resolver.resolve(p, {}).pipe(
      //take(1),
      map(res => ({ [`_${p.name}`]: res }))
    ))).pipe(
      tap(x => console.log(x)),
      combineAll(),
      tap(x => console.log(x)),
      map(v => v.reduce<any>((p, c) => ({ ...p, ...c }), {}))
    );*/
  }

  resolveGlobalsSingle(tag = uuid.v4()): Observable<any> {
    const plugins = this.contextManager.getAll(true);
    return merge(
      ...plugins.map(p => p.resolver.resolve(p, {}).pipe(
        map(res => [p.name, res])
      ))
    );
  }

  resolveAll(contexts: Array<InlineContext>, tag = uuid.v4()): Observable<any>  {
    /*let state: any;
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
        contexts.forEach(c => this.resolve(c).pipe(
          map(res => [c.name, res])
        ).subscribe(([n, res]) => {
          state = { ...state, [n]: res };
          sub$.next(state);
        }));
        return sub$.pipe(
          startWith(c),
          //debounceTime(100),
          distinctUntilChanged()
        );
      })
    );*/

    /*return combineLatest(
      contexts.map(c => this.resolve(c, tag).pipe(
        //take(1),
        map(res => ({ [c.name]: Array.isArray(res) ? res.length > 0 ? res[0] : undefined : res }))
      ))
    ).pipe(
      debounceTime(0),
      map(v => v.reduce<any>((p, c) => ({ ...p, ...c }), {})),
      tap(v => {
        if(tag.indexOf('panelpage:') === 0) {
          console.log(`resolveAll | tag: ${tag}`);
          console.log(v);
        }
      })
    );*/
    //const subject = new Subject();
    /*return combineLatest(
      contexts.map(c => new Observable<any>(obs => {
        this.resolve(c, tag).pipe(
          map(res => ({ [c.name]: res && Array.isArray(res) ? res.length > 0 ? res[0] : undefined : res }))
        ).subscribe(v => obs.next(v));
      }))
    ).pipe(
      debounceTime(0),
      map(v => v.reduce<any>((p, c) => ({ ...p, ...( c ? c : []) }), {}))
    );*/
    return merge(
      ...contexts.map(c => this.resolve(c, tag).pipe(
        map(res => [c.name, Array.isArray(res) ? res.length > 0 ? res[0] : undefined : res])
      ))
    ).pipe(
      scan((acc, [n, v]) => new Map<string, any>([ ...acc, [n, v] ]), new Map<string, any>()),
      filter(v => v.size === contexts.length),
      map(v => Object.assign({}, ...[...v.entries()].map(([k, v]) => ({[k]: v}))))
    );
  }

  resolveAllSingle(contexts: Array<InlineContext>, tag = uuid.v4()): Observable<[string, any]> {
    return merge(
      ...contexts.map(c => this.resolve(c, tag).pipe(
        map(res => [c.name, Array.isArray(res) ? res.length > 0 ? res[0] : undefined : res])
      ))
    ).pipe(
      map(([n, v]) => [n, v])
    );
  }

  resolveMerged(contexts: Array<InlineContext>, tag = uuid.v4()): Observable<any> {
    /*let state: any;
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
          //debounceTime(100),
          distinctUntilChanged()
        );
      })
    );*/
    return combineLatest([this.resolveGlobals(tag), contexts.length === 0 ? of({}) : this.resolveAll(contexts, tag)]).pipe(
      debounceTime(0),
      map(v => v.reduce<any>((p, c) => ({ ...p, ...c }), {}))
    );
    /*let resolved = {};
    const subject = new Subject();
    let g = false;
    let a = false;
    this.resolveGlobals(tag).subscribe(v => {
      g = true;
      resolved = { ...resolved, ...v };
      if(contexts.length === 0 || a) {
        subject.next(resolved);
      }
    });
    if(contexts.length !== 0) {
      this.resolveAll(contexts, tag).subscribe(v => {
        a = true;
        resolved = { ...resolved, ...v };
        if(g) {
          subject.next(resolved);
        }
      });s
    }
    return subject;*/
  }

  resolveMergedSingle(contexts: Array<InlineContext>, tag = uuid.v4()): Observable<any> {
    return merge(
      this.resolveGlobalsSingle(),
      contexts.length === 0 ? of({}) : this.resolveAllSingle(contexts)
    );
  }

  resolve(context: InlineContext, tag = uuid.v4()): Observable<any> {
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
