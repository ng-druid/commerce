import { Type } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';

export class ContentProvider {
  name: string
  title: string;
  selectionComponent: Type<any>;
  renderComponent: Type<any>;
  editorComponent: Type<any>;
  constructor(data?: ContentProvider) {
    if (data) {
      this.name = data.name;
      this.title = data.title;
      this.selectionComponent = data.selectionComponent ? data.selectionComponent : undefined;
      this.renderComponent = data.renderComponent ? data.renderComponent: undefined;
      this.editorComponent = data.editorComponent ? data.editorComponent: undefined;
    }
  }
}

export class ContentInstance {
  providerName: string;
  settings: Array<AttributeValue> = [];
  constructor(data?: ContentInstance) {
    if (data) {
      this.providerName = data.providerName;
      if(data.settings) {
        this.settings = data.settings.map(s => new AttributeValue(s));
      }
    }
  }
}
