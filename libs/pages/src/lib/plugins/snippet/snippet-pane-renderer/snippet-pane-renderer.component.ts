import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { TokenizerService } from '@classifieds-ui/token';
import { ContextManagerService } from '@classifieds-ui/context';
import { SnippetContentHandler } from '../../../handlers/snippet-content.handler';
import { Snippet } from '../../../models/plugin.models';
import { InlineContext } from '../../../models/context.models';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

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

  contentType: string;
  content: string;

  constructor(
    private handler: SnippetContentHandler,
    private tokenizerService: TokenizerService,
    private contextManager: ContextManagerService
  ) { }

  ngOnInit(): void {
    this.handler.toObject(this.settings).pipe(
      switchMap(snippet => this.resolveContexts(this.contexts).pipe(
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
    this.handler.toObject(this.settings).pipe(
      switchMap(snippet => this.resolveContexts(this.mergeContexts(this.contexts)).pipe(
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

  replaceTokens(v: string): string {
    if(this.tokens !== undefined) {
      this.tokens.forEach((value, key) => {
        //v = v.replaceAll(`[${key}]`, `${value}`);
        v = v.split(`[${key}]`).join(`${value}`)
      });
    }
    return v;
  }

  resolveContexts(contexts: Array<InlineContext>): Observable<undefined | Map<string, any>> {
    console.log(contexts);
    return forkJoin([
      ...this.contextManager.getAll(true).map(c => c.resolver.resolve().pipe(map(d => [c, d], take(1)))),
      ...(contexts === undefined || contexts.length === 0 ? [] : contexts.map(c => of(c).pipe(map(c => [c, c.data]), take(1))))
    ]).pipe(
      map(resolved => {
        let tokens = new Map<string, any>();
        resolved.forEach(([c, r]) => {
          tokens = new Map<string, any>([ ...tokens, ...this.tokenizerService.generateGenericTokens(r, c.name === '_root' ? '' : c.name) ]);
        });
        return tokens;
      })
    );
  }

  mergeContexts(contexts: Array<InlineContext>): Array<InlineContext> {
    return [ ...( this.contexts !== undefined ? this.contexts : [] ), ...( contexts !== undefined ? contexts : [] ) ];
  }

}
