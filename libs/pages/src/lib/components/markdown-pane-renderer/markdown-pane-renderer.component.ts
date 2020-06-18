import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-markdown-pane-renderer',
  templateUrl: './markdown-pane-renderer.component.html',
  styleUrls: ['./markdown-pane-renderer.component.scss']
})
export class MarkdownPaneRendererComponent implements OnInit, OnChanges {

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
