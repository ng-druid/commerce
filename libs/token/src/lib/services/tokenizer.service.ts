import { AttributeValue, AttributeTypes } from '@classifieds-ui/attributes';

import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class TokenizerService {

  constructor() { }

  generateTokens(settings: Array<AttributeValue>): Map<string, any> {
    const tokens = new Map<string, string>();
    this.attributeTokens(settings, tokens, '', 0);
    return tokens;
  }

  generateGenericTokens(obj: any): Map<string, any> {
    const tokens = new Map<string, string>();
    this.genericTokens(obj, tokens, '', 0);
    return tokens;
  }

  attributeTokens(settings: Array<AttributeValue>, tokens: Map<string,any>, prefix, level) {

    settings.forEach((s, i) => {
      if(s.name !== 'widget') {
        for(const prop in s) {
          if(s.type === AttributeTypes.Complex || (prop === 'attributes' && s.attributes && s.attributes.length > 0)) {
            if(s.type === AttributeTypes.Complex) {
              this.attributeTokens(s.attributes, tokens, `${prefix}`, level + 1);
            } else {
              this.attributeTokens(s.attributes, tokens, `${prefix}.${s.name}`, level + 1);
            }
          } else if(prop !== 'attributes') {
            if(prop === s.name) {
              tokens.set(`${prefix}.${prop}`, s[prop]);
            } else {
              tokens.set(`${prefix}.${s.name}.${prop}`, s[prop]);
            }
          }
        }
      }
    })

  }

  genericTokens(obj: any, tokens: Map<string,any>, prefix, level) {
    if(level === 0) {
      tokens.set('.', obj);
    }
    for(const prop in obj) {
      const type = typeof(obj[prop]);
      if(type !== 'object') {
        tokens.set(`${prefix}.${prop}`, obj[prop]);
      } else if(Array.isArray(obj[prop]) && prop === 'attributes') {
        this.attributeTokens(obj[prop], tokens, `${prefix}.${prop}`, level + 1);
      } else if(Array.isArray(obj[prop])) {
        var len = obj[prop].length;
        for(let i = 0; i < len; i++) {
          this.genericTokens(obj[prop][i], tokens, `${prefix}.${prop}.${i}`, level + 1);
        }
      } else {
        this.genericTokens(obj[prop], tokens, `${prefix}.${prop}`, level + 1);
      }
    }
  }

  replaceTokens(v: string, tokens: Map<string, any>): string {
    if(tokens) {
      tokens.forEach((value, key) => {
        v = v.replace(`[${key}]`, `${value}`);
      });
    }
    return v;
  }

}
