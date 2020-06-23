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

  snippet: Snippet;

  constructor(private handler: SnippetContentHandler) { }

  ngOnInit(): void {
    this.handler.toObject(this.settings).subscribe((snippet: Snippet) => {
      this.snippet = snippet;
    });
  }

  ngOnChanges(): void {
    this.handler.toObject(this.settings).subscribe((snippet: Snippet) => {
      this.snippet = snippet;
    });
  }

}
