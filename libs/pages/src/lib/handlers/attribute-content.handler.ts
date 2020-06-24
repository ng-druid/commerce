import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { AttributeValue, AttributeWidget, AttributeTypes } from '@classifieds-ui/attributes';
import { Observable, of } from 'rxjs';

@Injectable()
export class AttributeContentHandler implements ContentHandler {
  constructor() { }
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
  widgetSettings(widget: AttributeWidget) {
    return [new AttributeValue({
      name: 'widget',
      type: AttributeTypes.Text,
      displayName: 'Widget',
      value: widget.name,
      computedValue: widget.name,
      intValue: 0,
      attributes: []
    })];
  }
}
