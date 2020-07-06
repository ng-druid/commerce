import { Injectable, Attribute } from '@angular/core';
import { AttributeValue, AttributeTypes } from '../models/attributes.models';

@Injectable({
  providedIn: 'root'
})
export class AttributeSerializerService {

  constructor() { }

  serialize(obj: any, prop: string): AttributeValue {

    const type = typeof(obj);
    console.log(type);

    if(type !== 'object') {
      return new AttributeValue({
        name: prop,
        type: AttributeTypes.Text,
        displayName: prop,
        value: obj,
        intValue: undefined,
        computedValue: obj,
        attributes: []
      });
    } else if(Array.isArray(obj)) {
      const len = obj.length;
      const attrValues: Array<AttributeValue> = [];
      for(let i=0; i < len; i++) {
        if(typeof(obj[i]) !== 'object') {
          attrValues.push(this.serialize({ value: obj[i] }, `${i}`));
        } else {
          attrValues.push(this.serialize(obj[i], `${i}`));
        }
      }
      return new AttributeValue({
        name: prop,
        type: AttributeTypes.Array,
        displayName: prop,
        value: undefined,
        intValue: undefined,
        computedValue: undefined,
        attributes: attrValues
      });
    } else {
      const attrValues: Array<AttributeValue>  = [];
      for(const p in obj) {
        attrValues.push(this.serialize(obj[p], p));
      }
      return new AttributeValue({
        name: prop,
        type: AttributeTypes.Complex,
        displayName: prop,
        value: undefined,
        intValue: undefined,
        computedValue: undefined,
        attributes: attrValues
      });
    }

  }

}
