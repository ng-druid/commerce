import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { AttributeValue, AttributeTypes, Attribute } from '@classifieds-ui/attributes';
import { of, Observable } from 'rxjs';
import { PanelPage, Pane, Panel } from '../models/page.models';

@Injectable({
  providedIn: 'root'
})
export class PanelContentHandler implements ContentHandler {

  constructor() { }

  handleFile(file: File): Observable<Array<AttributeValue>> {
    return of();
  }

  handlesType(type: string): boolean {
    return false;
  }

  implementsRendererOverride(): boolean {
    return false;
  }

  hasRendererOverride(settings: Array<AttributeValue>): Observable<boolean> {
    return of(false);
  }

  isDynamic(): boolean {
    return false;
  }

  buildDynamicItems(settings: Array<AttributeValue>, identity: string): Observable<Array<AttributeValue>> {
    return of([]);
  }

  toObject(settings: Array<AttributeValue>): Observable<PanelPage> {
    return of(new PanelPage({
      id: settings.find(s => s.name === 'id').value,
      gridItems: settings.find(s => s.name === 'gridItems').attributes.map(a => a.attributes.reduce<any>((p, c) => ({ ...p, [c.name]: parseInt(c.value) }), {})),
      panels: settings.find(s => s.name === 'panels').attributes.map(a => ({
        stylePlugin: a.attributes.find(s => s.name === 'stylePlugin').value,
        settings: a.attributes.find(s => s.name === 'settings').attributes.map(a => a.attributes.reduce<any>((p, c) => (c.name === 'settings' ? { ...p, settings: c.attributes } : { ...p, [c.name]: c.value }), {})),
        panes: a.attributes.find(s => s.name === 'panes').attributes.map(a => a.attributes.reduce<any>((p, c) => (c.name === 'settings' ? { ...p, settings: c.attributes } : { ...p, [c.name]: c.value }), {}))
      }))
    }));
  }

  buildSettings(panelPage: PanelPage): Array<AttributeValue> {
    return [
      new AttributeValue({
        name: 'id',
        type: AttributeTypes.Text,
        displayName: 'id',
        value: panelPage.id,
        computedValue: panelPage.id,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'gridItems',
        type: AttributeTypes.Complex,
        displayName: 'Grid Items',
        value: undefined,
        computedValue: undefined,
        intValue: 0,
        attributes: panelPage.gridItems.map((g,i) => new AttributeValue({
          name: `${i}`,
          type: AttributeTypes.Complex,
          displayName: `${i}`,
          value: undefined,
          computedValue: undefined,
          intValue: 0,
          attributes: Object.keys(g).map(prop => new AttributeValue({
            name: prop,
            type: AttributeTypes.Number,
            displayName: prop,
            value: `${g[prop]}`,
            computedValue: `${g[prop]}`,
            intValue: g[prop],
            attributes: []
          }))
        }))
      }),
      new AttributeValue({
        name: 'panels',
        type: AttributeTypes.Complex,
        displayName: 'Panels',
        value: undefined,
        computedValue: undefined,
        intValue: 0,
        attributes: panelPage.panels.map((p,i) => new AttributeValue({
          name: `${i}`,
          type: AttributeTypes.Complex,
          displayName: `${i}`,
          value: undefined,
          computedValue: undefined,
          intValue: 0,
          attributes: [new AttributeValue({
            name: 'panes',
            type: AttributeTypes.Complex,
            displayName: 'Panes',
            value: undefined,
            computedValue: undefined,
            intValue: 0,
            attributes: p.panes.map((pp,i2) => new AttributeValue({
              name: `${i2}`,
              type: AttributeTypes.Complex,
              displayName: `${i2}`,
              value: undefined,
              computedValue: undefined,
              intValue: 0,
              attributes: [
                new AttributeValue({
                  name: 'contentPlugin',
                  type: AttributeTypes.Text,
                  displayName: 'Content Plugin',
                  value: pp.contentPlugin,
                  computedValue: pp.contentPlugin,
                  intValue: 0,
                  attributes: []
                }),
                new AttributeValue({
                  name: 'name',
                  type: AttributeTypes.Text,
                  displayName: 'Name',
                  value: pp.name,
                  computedValue: pp.name,
                  intValue: 0,
                  attributes: []
                }),
                new AttributeValue({
                  name: 'label',
                  type: AttributeTypes.Text,
                  displayName: 'Label',
                  value: pp.label,
                  computedValue: pp.label,
                  intValue: 0,
                  attributes: []
                }),
                new AttributeValue({
                  name: 'settings',
                  type: AttributeTypes.Complex,
                  displayName: 'Settings',
                  value: undefined,
                  computedValue: undefined,
                  intValue: 0,
                  attributes: pp.settings.map(s => new AttributeValue(s))
                })
              ]
            }))
          })]
        }))
      })
    ];
  }

  fromPanes(panesAsSettings: Array<AttributeValue>): Array<Pane> {
    return panesAsSettings.map(a => new Pane(a.attributes.reduce<any>((p, c) => (c.name === 'settings' ? { ...p, settings: c.attributes } : { ...p, [c.name]: c.value }), {})));
  }

  wrapPanel(panes: Array<Pane>): Panel {
    return new Panel({
      stylePlugin: undefined,
      settings: [],
      panes: panes
    });
  }

}
