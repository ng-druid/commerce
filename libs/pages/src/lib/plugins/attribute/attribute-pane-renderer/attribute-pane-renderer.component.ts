import { Component, OnInit, Input } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { AttributeContentHandler } from '../../../handlers/attribute-content.handler';

@Component({
  selector: 'classifieds-ui-attribute-pane-renderer',
  templateUrl: './attribute-pane-renderer.component.html',
  styleUrls: ['./attribute-pane-renderer.component.scss']
})
export class AttributePaneRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  attributeValues:  Array<AttributeValue> = [];

  constructor(private handler: AttributeContentHandler) { }

  ngOnInit(): void {
    this.attributeValues = this.handler.valueSettings(this.settings);
    console.log(this.attributeValues);
  }

}
