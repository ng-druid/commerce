import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { SnippetContentHandler } from '../../../handlers/snippet-content.handler';
import { Snippet } from '../../../models/page.models';

@Component({
  selector: 'classifieds-ui-snippet-pane-renderer',
  templateUrl: './snippet-pane-renderer.component.html',
  styleUrls: ['./snippet-pane-renderer.component.scss']
})
export class SnippetPaneRendererComponent implements OnInit, OnChanges {

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  tokens: Map<string, any>;

  contentType: string;
  content: string;

  constructor(private handler: SnippetContentHandler) { }

  ngOnInit(): void {
    this.handler.toObject(this.settings).subscribe((snippet: Snippet) => {
      this.contentType = snippet.contentType;
      this.content = this.replaceTokens(snippet.content);
    });
  }

  ngOnChanges(): void {
    this.handler.toObject(this.settings).subscribe((snippet: Snippet) => {
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

}
