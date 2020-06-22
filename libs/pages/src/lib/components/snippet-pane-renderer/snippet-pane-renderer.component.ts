import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-snippet-pane-renderer',
  templateUrl: './snippet-pane-renderer.component.html',
  styleUrls: ['./snippet-pane-renderer.component.scss']
})
export class SnippetPaneRendererComponent implements OnInit, OnChanges {

  @Input()
  settings: Array<AttributeValue> = [];

  content: string;

  constructor() { }

  ngOnInit(): void {
    this.content = this.settings.find(s => s.name === 'content').value;
  }

  ngOnChanges(): void {
    this.content = this.settings.find(s => s.name === 'content').value;
  }

}
