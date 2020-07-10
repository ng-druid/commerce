import { Injectable } from '@angular/core';
import { ContextManagerService } from '@classifieds-ui/context';
import { RuleSet } from 'angular2-query-builder';
import { Observable, of, forkJoin } from 'rxjs';
import { RulesParserService } from './rules-parser.service';
import { InlineContext } from '../models/context.models';
import { Engine } from 'json-rules-engine';
import { map, tap, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RulesResolverService {

  constructor(
    private rulesParser: RulesParserService,
    private contextManager: ContextManagerService
  ) { }

  evaluate(ngRule: RuleSet, contexts: Array<InlineContext> = []): Observable<boolean> {
    return this.buildFacts(contexts).pipe(
      map(facts => [facts, new Engine()]),
      tap(([facts, engine]) => engine.addRule(this.rulesParser.toEngineRule(ngRule))),
      switchMap(([facts, engine]) => new Observable<boolean>(obs => {
        engine.run(facts).then(res => {
          obs.next(res.events.findIndex(e => e.type === 'visible') > -1);
          obs.complete();
        });
      }))
    );
  }

  buildFacts(contexts: Array<InlineContext> = []): Observable<any> {
    const resolvers$ = contexts.reduce<Array<Observable<[string, any]>>>((p, c) => {
      const plugin = this.contextManager.lookupContext(c.name);
      if(plugin !== undefined) {
        return [ ...p, plugin.resolver.resolve().pipe(
          map(data => [c.name, data])
        )];
      } else {
        return [ ...p, of([c.name, c.data])];
      }
    }, []);
    return forkJoin(resolvers$).pipe(
      map(resolved => resolved.reduce<any>((p, [n, d]) => ({ ...p, [n]: d }), {}))
    );
  }

}
