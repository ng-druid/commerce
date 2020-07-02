import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AttributeValue, AttributeTypes } from '@classifieds-ui/attributes';
import { ContentHandler } from '@classifieds-ui/content';
import { SnippetContentHandler } from './snippet-content.handler';
import { Observable, of, Subject } from 'rxjs';
import * as uuid from 'uuid';
import { map, filter, switchMap } from 'rxjs/operators';
import { Rest, Param, Mapping } from '../models/datasource.models';
import { PageBuilderFacade } from '../features/page-builder/page-builder.facade';
import { selectDataset } from '../features/page-builder/page-builder.selectors';
import { PageBuilderPartialState } from '../features/page-builder/page-builder.reducer';
import { TokenizerService } from '@classifieds-ui/token';
import { Panel, PanelPage, Snippet, Pane } from '../models/page.models';
import { InlineContext } from '../models/context.models';
import { PanelContentHandler } from '../handlers/panel-content.handler';
import { UrlGeneratorService } from '../services/url-generator.service';

@Injectable()
export class RestContentHandler implements ContentHandler {

  constructor(
    private snippetHandler: SnippetContentHandler,
    private pageBuilderFacade: PageBuilderFacade,
    private store: Store<PageBuilderPartialState>,
    private tokenizerService: TokenizerService,
    private panelHandler: PanelContentHandler,
    private urlGeneratorService: UrlGeneratorService
  ) { }

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
  isDynamic(): boolean {
    return true;
  }
  buildDynamicItems(settings: Array<AttributeValue>, metadata: Map<string, any>): Observable<Array<AttributeValue>> {
    const subject = new Subject<Array<AttributeValue>>();
    this.toObject(settings).pipe(
      switchMap(r => this.urlGeneratorService.generateUrl(r.url, r.params, metadata).pipe(
        map<string, [Rest, string]>(url => [r, url])
      ))
    ).subscribe(([r, url]) => {
      this.pageBuilderFacade.loadRestData(`${metadata.get('tag')}`, new Rest({ ...r, url }));
      this.store.pipe(
        select(selectDataset(`${metadata.get('tag')}`)),
        filter(dataset => dataset !== undefined),
        // map(dataset => dataset.results.map(row => this.tokenizerService.generateGenericTokens(row))),
        map(dataset => {
          if(r.renderer.data.contentType === 'text') {
            const pane = (metadata.get('panes') as Array<Pane>).find(p => p.name === r.renderer.data.content);
            return dataset.results.map(row => {
              const name = uuid.v4();
              return new Pane({ ...pane, label: name, contexts: [new InlineContext({ name: "_root", adaptor: 'data', data: row })] });
            }) as Array<Pane>;
          } else {
            return dataset.results.map(row => new Pane({ contentPlugin: 'snippet', name: uuid.v4(), label: undefined, contexts: [new InlineContext({ name: "_root", adaptor: 'data', data: row })], settings: this.snippetHandler.buildSettings({ ...r.renderer.data, content: r.renderer.data.content }) })) as Array<Pane>;
          }
        }),
        map(panes => new Panel({ stylePlugin: undefined, settings: [], panes })),
        map(panel => this.panelHandler.buildSettings(new PanelPage({ id: undefined, layoutType: 'grid', gridItems: [], panels: [ panel ] })))
      ).subscribe(panelSettings => {
        subject.next(panelSettings.find(s => s.name === 'panels').attributes[0].attributes.find(s => s.name === 'panes').attributes);
        subject.complete();
      });
    });
    return subject;
  }
  toObject(settings: Array<AttributeValue>): Observable<Rest> {
    const snip = settings.find(s => s.name === 'renderer').attributes.find(a => a.name === 'data').attributes;
    return this.snippetHandler.toObject(snip).pipe(
      map(data => new Rest({
        url: settings.find(s => s.name === 'url').value,
        params: settings.find(s => s.name === 'params').attributes.map(a => a.attributes.reduce<Param>((p, c) => new Param({ ...p, [c.name]: c.name === 'mapping' ? c.attributes.reduce<Mapping>((p, c) => new Mapping({ ...p, [c.name]: c.value }), new Mapping()) : c.name === 'flags' ? c.attributes.map(f => ({ enabled: true, name: f.value }) ) : c.value }), new Param())),
        renderer: {
          type: settings.find(s => s.name === 'renderer').attributes.find(a => a.name === 'type').value,
          data
        }
      }))
    );
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
