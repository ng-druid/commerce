import { Type } from '@angular/core';

export class ContentProvider {
  title: string;
  selectionComponent: Type<any>;
  constructor(data?: ContentProvider) {
    if (data) {
      this.title = data.title;
      this.selectionComponent = data.selectionComponent;
    }
  }
}
