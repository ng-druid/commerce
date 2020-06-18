import { Type } from '@angular/core';

export class ContentProvider {
  name: string
  title: string;
  selectionComponent: Type<any>;
  constructor(data?: ContentProvider) {
    if (data) {
      this.name = data.name;
      this.title = data.title;
      this.selectionComponent = data.selectionComponent;
    }
  }
}

export class ContentInstance {
  providerName: string;
  constructor(data?: ContentInstance) {
    if (data) {
      this.providerName = data.providerName;
    }
  }
}
