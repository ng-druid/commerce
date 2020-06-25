import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { AttributeValue, AttributeWidget, AttributeTypes } from '@classifieds-ui/attributes';
import { Observable, of } from 'rxjs';
import { Snippet } from '../models/page.models';
import { SnippetContentHandler } from './snippet-content.handler';

@Injectable()
export class AttributeContentHandler implements ContentHandler {
  constructor(private snippetHandler: SnippetContentHandler) { }
  handleFile(file: File): Observable<Array<AttributeValue>> {
    return of([]);
  }
  handlesType(type: string): boolean {
    return false;
  }
  valueSettings(attributeValues: Array<AttributeValue>): Array<AttributeValue> {
    const settings = [];
    attributeValues.forEach(attributeValue => {
      if(attributeValue.name === 'value') {
        settings.push(attributeValue);
      }
    });
    return settings;
  }
  rendererSnippet(settings : Array<AttributeValue>): Observable<undefined | Snippet> {
    let snippet$: Observable<Snippet>;
    settings.forEach(s => {
      if(s.name === '_renderer') {
        snippet$ = this.snippetHandler.toObject(s.attributes);
      }
    });
    return snippet$ !== undefined ? snippet$ : of(undefined);
  }
  rendererOverrideSettings(snippet: Snippet) {
    return [new AttributeValue({
      name: '_renderer',
      type: AttributeTypes.Complex,
      displayName: 'Renderer Override',
      value: undefined,
      computedValue: undefined,
      intValue: 0,
      attributes: this.snippetHandler.buildSettings(snippet)
    })];
  }
  widgetSettings(widget: AttributeWidget) {
    return [new AttributeValue({
      name: 'widget',
      type: widget.schema.type,
      displayName: 'Widget',
      value: widget.name,
      computedValue: widget.name,
      intValue: 0,
      attributes: []
    })];
  }
}
