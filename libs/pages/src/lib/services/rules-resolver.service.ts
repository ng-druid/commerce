import { Injectable } from '@angular/core';
import { RuleSet } from 'angular2-query-builder';
import { Observable, of } from 'rxjs';
import { RulesParserService } from './rules-parser.service';
import { InlineContext } from '../models/context.models';
import { Engine } from 'json-rules-engine';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RulesResolverService {

  constructor(private rulesParser: RulesParserService) { }

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
    const facts = contexts.reduce<any>((p, c) => ({ ...p, [c.name]: c.data }), {});
    return of(facts);
  }

}
