import { Observable } from 'rxjs';
import { Type } from '@angular/core';

export interface ContextResolver {
  resolve(): Observable<any>
}

export class ContextPlugin {
  name: string
  title: string;
  baseObject: any;
  resolver: ContextResolver;
  adaptor: string;
  editorComponent?: Type<any>;
  global? = false;
  constructor(data?: ContextPlugin) {
    if (data) {
      this.name = data.name;
      this.title = data.title;
      this.adaptor = data.adaptor;
      this.baseObject = data.baseObject;
      this.resolver = data.resolver;
      this.global = data.global === undefined ? false: data.global;
      if(data.editorComponent) {
        this.editorComponent = data.editorComponent;
      }
    }
  }
}
