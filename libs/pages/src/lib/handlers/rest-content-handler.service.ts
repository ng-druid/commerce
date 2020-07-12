import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AttributeValue, AttributeTypes, AttributeSerializerService } from '@classifieds-ui/attributes';
import { ContentHandler, ContentBinding } from '@classifieds-ui/content';
import { ContextManagerService } from '@classifieds-ui/context';
import { SnippetContentHandler } from './snippet-content.handler';
import { Observable, of, Subject, iif, forkJoin, from } from 'rxjs';
import * as uuid from 'uuid';
import { map, filter, switchMap, tap, take, defaultIfEmpty } from 'rxjs/operators';
import { Rest, Param, Mapping, Dataset } from '../models/datasource.models';
import { PageBuilderFacade } from '../features/page-builder/page-builder.facade';
import { selectDataset } from '../features/page-builder/page-builder.selectors';
import { PageBuilderPartialState } from '../features/page-builder/page-builder.reducer';
import { TokenizerService } from '@classifieds-ui/token';
import { Panel, PanelPage, Pane } from '../models/page.models';
import { InlineContext } from '../models/context.models';
import { PanelContentHandler } from '../handlers/panel-content.handler';
import { UrlGeneratorService } from '../services/url-generator.service';
import { SelectMapping, SelectOption, Snippet } from '../models/plugin.models';
import { RulesResolverService } from '../services/rules-resolver.service';

@Injectable()
export class RestContentHandler implements ContentHandler {

  constructor(
    private snippetHandler: SnippetContentHandler,
    private pageBuilderFacade: PageBuilderFacade,
    private store: Store<PageBuilderPartialState>,
    private tokenizerService: TokenizerService,
    private panelHandler: PanelContentHandler,
    private urlGeneratorService: UrlGeneratorService,
    private attributeSerializer: AttributeSerializerService,
    private rulesResolver: RulesResolverService,
    private contextManager: ContextManagerService
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
  isDynamic(settings: Array<AttributeValue>): boolean {
    return ['snippet','pane'].indexOf(this.getRenderType(settings)) > -1;
  }
  fetchDynamicData(settings: Array<AttributeValue>, metadata: Map<string, any>): Observable<any> {
    const subject = new Subject<Dataset>();
    this.toObject(settings).pipe(
      switchMap(r => this.urlGeneratorService.generateUrl(r.url, r.params, metadata).pipe(
        map<string, [Rest, string]>(url => [r, url])
      ))
    ).subscribe(([r, url]) => {
      this.pageBuilderFacade.loadRestData(`${metadata.get('tag')}`, new Rest({ ...r, url }));
      this.store.pipe(
        select(selectDataset(`${metadata.get('tag')}`)),
        filter(dataset => dataset !== undefined),
      ).subscribe(dataset => {
        subject.next(dataset);
        subject.complete();
      });
    });
    return subject;
  }
  buildDynamicItems(settings: Array<AttributeValue>, metadata: Map<string, any>): Observable<Array<AttributeValue>> {
    const subject = new Subject<Array<AttributeValue>>();
    const globalContexts = this.contextManager.getAll().map(c => new InlineContext({ name: c.name, adaptor: 'data', data: c.baseObject  }));
    this.toObject(settings).pipe(
      switchMap(r => this.urlGeneratorService.generateUrl(r.url, r.params, metadata).pipe(
        map<string, [Rest, string]>(url => [r, url])
      ))
    ).subscribe(([r, url]) => {
      this.pageBuilderFacade.loadRestData(`${metadata.get('tag')}`, new Rest({ ...r, url }));
      this.store.pipe(
        select(selectDataset(`${metadata.get('tag')}`)),
        filter(dataset => dataset !== undefined),
        switchMap(dataset => this.getBindings(settings).pipe(
          map<Array<ContentBinding>, [Dataset, Array<ContentBinding>]>(bindings => [dataset, bindings])
        )),
        tap(([dataset, bindings]) => console.log(bindings)),
        switchMap(([dataset, bindings]) => iif(
          () => bindings.length > 0,
          new Observable<[Dataset, Array<string>]>(obs => {
            forkJoin(
              dataset.results.map(row => from(bindings).pipe(
                map(binding => (metadata.get('panes') as Array<Pane>).find(p => p.name === binding.id)),
                switchMap(pane => iif(
                  () => pane.rule && pane.rule !== null && pane.rule.condition !== '',
                  this.rulesResolver.evaluate(pane.rule,[ ...globalContexts, ...(pane.contexts !== undefined ? pane.contexts : []), new InlineContext({ name: "_root", adaptor: 'data', data: row }) ]).pipe(
                    map<boolean, [Pane, boolean]>(res => [pane, res])
                  ),
                  of(false).pipe(
                    map<boolean, [Pane, boolean]>(b => [pane, b])
                  )
                )),
                filter(([pane, res]) => res),
                map(([pane, res]) => pane.name),
                defaultIfEmpty(bindings[0].id),
                take(1)
              ))
            ).pipe(
              map<Array<string>, [Dataset, Array<string>]>(groups => [dataset, groups])
            ).subscribe(d => {
              obs.next(d);
              obs.complete();
            });
          }),
          new Observable<[Dataset]>(obs => {
            obs.next([dataset]);
            obs.complete();
          })
        )),
        map(([dataset, paneMappings]) => {
          console.log('map renderer');
          if(r.renderer.type === 'pane') {
            return dataset.results.map((row, rowIndex) => {
              const attachedPane = (metadata.get('panes') as Array<Pane>).find(p => p.name === paneMappings[rowIndex]);
              const contexts = (metadata.get('contexts') as Array<InlineContext>) ? (metadata.get('contexts') as Array<InlineContext>) : [];
              const mergedContexts = [ ...(attachedPane !== undefined && attachedPane.contexts !== undefined ? attachedPane.contexts : []), ...contexts ];
              const name = uuid.v4();
              return new Pane({ ...attachedPane, rule: undefined, label: name, contexts: [ ...mergedContexts, new InlineContext({ name: "_root", adaptor: 'data', data: row })] });
            }) as Array<Pane>;
          } else {
            const contexts = (metadata.get('contexts') as Array<InlineContext>) ? (metadata.get('contexts') as Array<InlineContext>) : [];
            return dataset.results.map(row => new Pane({ contentPlugin: 'snippet', name: uuid.v4(), label: undefined, contexts: [ ...contexts,new InlineContext({ name: "_root", adaptor: 'data', data: row })], settings: this.snippetHandler.buildSettings({ ...r.renderer.data, content: r.renderer.data.content }) })) as Array<Pane>;
          }
        }),
        map(panes => new Panel({ stylePlugin: undefined, settings: [], panes })),
        map(panel => this.panelHandler.buildSettings(new PanelPage({ id: undefined, layoutType: 'grid', displayType: 'page', gridItems: [], panels: [ panel ] })))
      ).subscribe(panelSettings => {
        subject.next(panelSettings.find(s => s.name === 'panels').attributes[0].attributes.find(s => s.name === 'panes').attributes);
        subject.complete();
      });
    });
    return subject;
  }
  buildSelectOptionItems(settings: Array<AttributeValue>, metadata: Map<string, any>) {
    this.toObject(settings).pipe(
      switchMap(r => this.urlGeneratorService.generateUrl(r.url, r.params, metadata).pipe(
        map(url => [r, url])
      )),
      map<[Rest, string], Rest>(([r, url]) => new Rest({ ...r, url }))
    ).subscribe(r => {
      this.pageBuilderFacade.loadRestData(`${metadata.get('tag')}`, r);
    });
    return this.store.pipe(
      select(selectDataset(`${metadata.get('tag')}`)),
      filter(d => d !== undefined),
      map(d => [d, d.results.map(r => this.tokenizerService.generateGenericTokens(r))]),
      map<[Dataset, Array<Map<string, any>>],[Dataset, Array<Map<string,any>>, SelectMapping]>(([d, tokens]) => [d, tokens, (new SelectMapping(JSON.parse((metadata.get('snippet') as Snippet).content)))]),
      map(([d, tokens, mapping]) => tokens.map((t,i) => new SelectOption({ dataItem: d.results[i], value: mapping.value === '[.]'  ? this.attributeSerializer.serialize(d.results[i], 'value') : this.attributeSerializer.serialize(this.tokenizerService.replaceTokens(mapping.value, t), 'value'), label: this.tokenizerService.replaceTokens(mapping.label, t) })))
    );
  }
  getBindings(settings: Array<AttributeValue>): Observable<Array<ContentBinding>> {
    return this.toObject(settings).pipe(
      switchMap(rest => iif(
        () => rest.renderer.type === 'pane',
        of(rest.renderer.bindings),
        of([])
      ))
    );
  }
  toObject(settings: Array<AttributeValue>): Observable<Rest> {
    return of(this.attributeSerializer.deserializeAsObject(settings));
    /*const snip = settings.find(s => s.name === 'renderer').attributes.find(a => a.name === 'data').attributes;
    return this.snippetHandler.toObject(snip).pipe(
      map(data => new Rest({
        url: settings.find(s => s.name === 'url').value,
        params: settings.find(s => s.name === 'params').attributes.map(a => a.attributes.reduce<Param>((p, c) => new Param({ ...p, [c.name]: c.name === 'mapping' ? c.attributes.reduce<Mapping>((p, c) => new Mapping({ ...p, [c.name]: c.value }), new Mapping()) : c.name === 'flags' ? c.attributes.map(f => ({ enabled: true, name: f.value }) ) : c.value }), new Param())),
        renderer: {
          type: settings.find(s => s.name === 'renderer').attributes.find(a => a.name === 'type').value,
          data
        }
      }))
    );*/
  }
  buildSettings(rest: Rest): Array<AttributeValue> {
    return this.attributeSerializer.serialize(rest, 'root').attributes;
    /*return [
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
                }),
                new AttributeValue({
                  name: 'testValue',
                  type: AttributeTypes.Text,
                  displayName: 'Test Value',
                  value: p.mapping.testValue,
                  computedValue: p.mapping.testValue,
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
    ];*/
  }
  getRenderType(settings: Array<AttributeValue>) : string {
    const renderType = [settings.find(s => s.name === 'renderer')].map(r => r.attributes.find(s => s.name === 'type'));
    return renderType.length > 0 ? renderType[0].value: undefined;
  }
}
