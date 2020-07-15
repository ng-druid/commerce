import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { TokenizerService } from '@classifieds-ui/token';
import { SnippetContentHandler } from '../../../handlers/snippet-content.handler';
import { Snippet } from '../../../models/plugin.models';
import { InlineContext } from '../../../models/context.models';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-snippet-pane-renderer',
  templateUrl: './snippet-pane-renderer.component.html',
  styleUrls: ['./snippet-pane-renderer.component.scss']
})
export class SnippetPaneRendererComponent implements OnInit, OnChanges {

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  contexts: Array<InlineContext> = [];

  @Input()
  tokens: Map<string, any>;

  @Input()
  resolvedContext: any;

  contentType: string;
  content: string;

  constructor(
    private handler: SnippetContentHandler,
    private tokenizerService: TokenizerService
  ) { }

  ngOnInit(): void {
    this.handler.toObject(this.settings).pipe(
      switchMap(snippet => this.resolveContexts().pipe(
        map<Map<string, any>, [Snippet, Map<string, any> | undefined]>(tokens => [snippet, tokens])
      ))
    ).subscribe(([snippet, tokens]) => {
      if(tokens !== undefined) {
        this.tokens = tokens;
      }
      this.contentType = snippet.contentType;
      this.content = this.replaceTokens(snippet.content);
    });
  }

  ngOnChanges(): void {
    console.log('pane changed');
    this.handler.toObject(this.settings).pipe(
      switchMap(snippet => this.resolveContexts().pipe(
        map<Map<string, any>, [Snippet, Map<string, any> | undefined]>(tokens => [snippet, tokens])
      ))
    ).subscribe(([snippet, tokens]) => {
      if(tokens !== undefined) {
        console.log('tokens');
        console.log(tokens);
        this.tokens = tokens;
      }
      this.contentType = snippet.contentType;
      this.content = this.replaceTokens(snippet.content);
    });
  }

  replaceTokens(v: string): string {
    if(this.tokens !== undefined) {
      this.tokens.forEach((value, key) => {
        //v = v.replaceAll(`[${key}]`, `${value}`);
        v = v.split(`[${key}]`).join(`${value}`)
      });
    }
    return v;
  }

  resolveContexts(): Observable<undefined | Map<string, any>> {
    /*return forkJoin([
      ...this.contextManager.getAll(true).map(c => c.resolver.resolve(c).pipe(map(d => [c, d], take(1)))),
      ...(contexts === undefined || contexts.length === 0 ? [] : contexts.map(c => of(c).pipe(map(c => [c, c.data]), take(1))))
    ])*/
    /*console.log('resolve contexts');
    return this.inlineContextResolver.resolveMerged(contexts).pipe(
      tap(v => console.log(v)),
      //take(1),
      map(resolved => {
        let tokens = new Map<string, any>();
        for(const name in resolvedContext) {
          tokens = new Map<string, any>([ ...tokens, ...this.tokenizerService.generateGenericTokens(resolved[name], name === '_root' ? '' : name) ]);
        }
        return tokens;
      })
    );*/
    return new Observable(obs => {
      let tokens = new Map<string, any>();
      if(this.resolvedContext) {
        for(const name in this.resolvedContext) {
          tokens = new Map<string, any>([ ...tokens, ...this.tokenizerService.generateGenericTokens(this.resolvedContext[name], name === '_root' ? '' : name) ]);
        }
      }
      obs.next(tokens);
      obs.complete();
    });
  }

  mergeContexts(contexts: Array<InlineContext>): Array<InlineContext> {
    return [ ...( this.contexts !== undefined ? this.contexts : [] ), ...( contexts !== undefined ? contexts : [] ) ];
  }

}
