import { Injectable } from '@angular/core';
import { AttributeValue, AttributeTypes } from '@classifieds-ui/attributes';
import { ContentHandler } from '@classifieds-ui/content';
import { SnippetContentHandler } from './snippet-content.handler';
import { Observable, of } from 'rxjs';
import { Rest } from '../models/datasource.models';

@Injectable()
export class RestContentHandler implements ContentHandler {

  constructor(private snippetHandler: SnippetContentHandler) { }

  handleFile(file: File): Observable<Array<AttributeValue>> {
    return of([]);
  }
  handlesType(type: string): boolean {
    return false;
  }
  implementsRendererOverride(): boolean {
    return true;
  }
  hasRendererOverride(settings: Array<AttributeValue>): Observable<boolean> {
    return of(false);
  }
  buildSettings(rest: Rest): Array<AttributeValue> {
    return [
      new AttributeValue({
        name: 'url',
        type: AttributeTypes.Text,
        displayName: 'Url',
        value: rest.url,
        computedValue: rest.url,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'params',
        type: AttributeTypes.Complex,
        displayName: 'Params',
        value: undefined,
        computedValue: undefined,
        intValue: 0,
        attributes: rest.params.map((p, i) => new AttributeValue({
          name: `${i}`,
          type: AttributeTypes.Complex,
          displayName: `${i}`,
          value: undefined,
          computedValue: undefined,
          intValue: 0,
          attributes: [
            new AttributeValue({
              name: 'mapping',
              type: AttributeTypes.Complex,
              displayName: 'Mapping',
              value: undefined,
              computedValue: undefined,
              intValue: 0,
              attributes: [
                new AttributeValue({
                  name: 'type',
                  type: AttributeTypes.Text,
                  displayName: 'Type',
                  value: p.mapping.type,
                  computedValue: p.mapping.type,
                  intValue: 0,
                  attributes: []
                }),
                new AttributeValue({
                  name: 'context',
                  type: AttributeTypes.Text,
                  displayName: 'Context',
                  value: p.mapping.context,
                  computedValue: p.mapping.context,
                  intValue: 0,
                  attributes: []
                }),
                new AttributeValue({
                  name: 'value',
                  type: AttributeTypes.Text,
                  displayName: 'Value',
                  value: p.mapping.value,
                  computedValue: p.mapping.value,
                  intValue: 0,
                  attributes: []
                })
              ]
            }),
            new AttributeValue({
              name: 'flags',
              type: AttributeTypes.Complex,
              displayName: 'Flags',
              value: undefined,
              computedValue: undefined,
              intValue: 0,
              attributes: p.flags.reduce<Array<AttributeValue>>((f, c) => c.enabled ? [...f, new AttributeValue({
                name: 'flag',
                type: AttributeTypes.Text,
                displayName: 'Flag',
                value: c.name,
                computedValue: c.name,
                intValue: 0,
                attributes: []
              })] : f, [])
            })
          ]
        }))
      }),
      new AttributeValue({
        name: 'renderer',
        type: AttributeTypes.Complex,
        displayName: 'Renderer',
        value: undefined,
        computedValue: undefined,
        intValue: 0,
        attributes: [
          new AttributeValue({
            name: 'type',
            type: AttributeTypes.Text,
            displayName: 'Type',
            value: rest.renderer.type,
            computedValue: rest.renderer.type,
            intValue: 0,
            attributes: []
          }),
          new AttributeValue({
            name: 'data',
            type: AttributeTypes.Complex,
            displayName: 'Data',
            value: undefined,
            computedValue: undefined,
            intValue: 0,
            attributes: this.snippetHandler.buildSettings(rest.renderer.data)
          })
        ]
      })
    ];
  }
}
