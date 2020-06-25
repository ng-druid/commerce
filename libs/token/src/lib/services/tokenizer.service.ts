import { AttributeValue, AttributeTypes } from '@classifieds-ui/attributes';

import { Injectable } from '@angular/core';

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

}
