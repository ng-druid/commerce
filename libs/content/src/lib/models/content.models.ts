import { Type } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { Observable } from 'rxjs';

export interface ContentHandler {
  handleFile(file: File): Observable<Array<AttributeValue>>;
  handlesType(type: string): boolean
  implementsRendererOverride(): boolean
  hasRendererOverride(settings: Array<AttributeValue>): Observable<boolean>
  isDynamic(settings: Array<AttributeValue>): boolean
  buildDynamicItems(settings: Array<AttributeValue>, metadata: Map<string, any>): Observable<Array<AttributeValue>>
}

export class ContentPlugin {
  name: string
  title: string;
  fileTypes?: Array<string> = [];
  handler?: ContentHandler;
  selectionComponent: Type<any>;
  renderComponent: Type<any>;
  editorComponent: Type<any>;
  constructor(data?: ContentPlugin) {
    if (data) {
      this.name = data.name;
      this.title = data.title;
      this.handler = data.handler !== undefined ? data.handler: undefined;
      this.selectionComponent = data.selectionComponent ? data.selectionComponent : undefined;
      this.renderComponent = data.renderComponent ? data.renderComponent: undefined;
      this.editorComponent = data.editorComponent ? data.editorComponent: undefined;
    }
  }
}

export class ContentInstance {
  pluginName: string;
  settings: Array<AttributeValue> = [];
  constructor(data?: ContentInstance) {
    if (data) {
      this.pluginName = data.pluginName;
      if(data.settings) {
        this.settings = data.settings.map(s => new AttributeValue(s));
      }
    }
  }
}
