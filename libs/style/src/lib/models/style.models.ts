import { Type } from '@angular/core';

export class StylePlugin {
  name: string
  title: string;
  editorComponent: Type<any>;
  constructor(data?: StylePlugin) {
    if (data) {
      this.name = data.name;
      this.title = data.title;
      this.editorComponent = data.editorComponent ? data.editorComponent: undefined;
    }
  }
}
