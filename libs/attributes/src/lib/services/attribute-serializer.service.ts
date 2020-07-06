import { Injectable, Attribute } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AttributeValue, AttributeTypes } from '../models/attributes.models';
import { ValueComputerService } from '../services/value-computer.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeSerializerService {

  constructor(private valueComputer: ValueComputerService) { }

  serialize(obj: any, prop: string): AttributeValue {

    const type = typeof(obj);

    if(type !== 'object') {
      return new AttributeValue({
        name: prop,
        type: type !== 'string' ? AttributeTypes.Number : AttributeTypes.Text,
        displayName: prop,
        value: `${obj}`,
        intValue: undefined,
        computedValue: this.valueComputer.resolveComputedValue(`${obj}`, type !== 'string' ? AttributeTypes.Number : AttributeTypes.Text),
        attributes: []
      });
    } else if(Array.isArray(obj) && prop === 'attributes') {
      return new AttributeValue({
        name: prop,
        type: AttributeTypes.Complex,
        displayName: prop,
        value: undefined,
        intValue: undefined,
        computedValue: undefined,
        attributes: obj
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

  convertToGroup(setting: AttributeValue): FormGroup {

    const fg = new FormGroup({
      name: new FormControl(setting.name, Validators.required),
      type: new FormControl(setting.type, Validators.required),
      displayName: new FormControl(setting.displayName, Validators.required),
      value: new FormControl(setting.value, Validators.required),
      computedValue: new FormControl(setting.value, Validators.required),
      attributes: new FormArray([])
    });

    if(setting.attributes && setting.attributes.length > 0) {
      setting.attributes.forEach(s => {
        (fg.get('attributes') as FormArray).push(this.convertToGroup(s));
      })
    }

    return fg;

  }

}
