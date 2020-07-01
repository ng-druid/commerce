import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { TokenizerService } from '@classifieds-ui/token';
import { SnippetContentHandler } from '../../../handlers/snippet-content.handler';
import { Snippet } from '../../../models/page.models';
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

  contentType: string;
  content: string;

  constructor(private handler: SnippetContentHandler, private tokenizerService: TokenizerService) { }

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
        v = v.replace(`[${key}]`, `${value}`);
      });
    }
    return v;
  }

  resolveContexts(contexts: Array<InlineContext>): Observable<undefined | Map<string, any>> {
    return new Observable(obs => {
      if(this.contexts === undefined || this.contexts.length === 0) {
        obs.next();
        obs.complete();
      } else {
        let tokens = new Map<string, any>();
        const root = contexts.find(c => c.name === '_root');
        if(root !== undefined && root.adaptor === 'data' && root.data) {
          tokens = new Map<string, any>([ ...tokens, ...this.tokenizerService.generateGenericTokens(root.data) ])
        }
        obs.next(tokens);
        obs.complete();
      }
    });
  }

  mergeContexts(contexts: Array<InlineContext>): Array<InlineContext> {
    return [ ...( this.contexts !== undefined ? this.contexts : [] ), ...( contexts !== undefined ? contexts : [] ) ];
  }

}
