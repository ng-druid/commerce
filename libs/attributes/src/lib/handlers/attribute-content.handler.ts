import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { Observable, of } from 'rxjs';
import { AttributeValue } from '../models/attributes.models';

@Injectable()
export class AttributeContentHandler implements ContentHandler {
  constructor() { }
  handleFile(file: File): Observable<Array<AttributeValue>> {
    return of([]);
  }
  handlesType(type: string): boolean {
    return false;
  }
  toObject<AttributeValue>(settings): Observable<AttributeValue> {
    const attributeValue = new AttributeValue();
    return of(attributeValue as any);
  }
  buildSettings<AttributeValue>(attributeValue): Array<AttributeValue> {
    return [];
  }
}
