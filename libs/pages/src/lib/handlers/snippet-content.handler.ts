import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { AttributeValue, AttributeTypes, AttributeSerializerService } from '@classifieds-ui/attributes';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Snippet } from '../models/plugin.models';

@Injectable()
export class SnippetContentHandler implements ContentHandler {

  types = ['text/markdown', 'text/html'];

  constructor(private attributeSerializer: AttributeSerializerService) { }

  handleFile(file: File): Observable<Array<AttributeValue>> {
    return new Observable(obs => {
      const reader = new FileReader();
      reader.onload = () => {
        obs.next(this.buildSettings(new Snippet({ contentType: file.type, content: `${reader.result}`})));
        obs.complete();
      }
      reader.readAsText(file);
    });
  }

  handlesType(type: string): boolean {
    return this.types.find(t => t === type) !== undefined;
  }

  implementsRendererOverride(): boolean {
    return false;
  }

  hasRendererOverride(settings: Array<AttributeValue>): Observable<boolean> {
    return of(false);
  }

  isDynamic(settings: Array<AttributeValue>): boolean {
    return false;
  }

  buildDynamicItems(settings: Array<AttributeValue>, metadata: Map<string, any>): Observable<Array<AttributeValue>> {
    return of([]);
  }

  toObject(settings: Array<AttributeValue>): Observable<Snippet> {
    const snippet = new Snippet({
        content: settings.find(s => s.name === 'content').value,
        contentType: settings.find(s => s.name === 'contentType').value,
    });
    return of(snippet);
  }

  buildSettings(snippet: Snippet): Array<AttributeValue> {
    return this.attributeSerializer.serialize(snippet, 'root').attributes;
    /*return [
      new AttributeValue({
        name: 'contentType',
        type: AttributeTypes.Text,
        displayName: 'Content Type',
        value: snippet.contentType,
        computedValue: snippet.contentType,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'content',
        type: AttributeTypes.Number,
        displayName: 'Content',
        value: snippet.content,
        computedValue: snippet.content,
        intValue: 0,
        attributes: []
      }),
    ];*/
  }

}
