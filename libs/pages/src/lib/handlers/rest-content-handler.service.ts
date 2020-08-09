import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AttributeValue, AttributeSerializerService } from '@classifieds-ui/attributes';
import { ContentHandler, ContentBinding } from '@classifieds-ui/content';
import { SnippetContentHandler } from './snippet-content.handler';
import { Observable, of, Subject, iif, forkJoin, from } from 'rxjs';
import * as uuid from 'uuid';
import { map, filter, switchMap, take, defaultIfEmpty } from 'rxjs/operators';
import { Rest, Dataset } from '../models/datasource.models';
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
    private rulesResolver: RulesResolverService
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
    this.toObject(settings).pipe(
      switchMap(r => this.urlGeneratorService.generateUrl(r.url, r.params, metadata).pipe(
        map<string, [Rest, string]>(url => [r, url])
      ))
    ).subscribe(([r, url]) => {
      this.pageBuilderFacade.loadRestData(`${metadata.get('tag')}`, new Rest({ ...r, url }));
      this.store.pipe(
        select(selectDataset(`${metadata.get('tag')}`)),
        filter(dataset => dataset !== undefined),
        switchMap(dataset => this.getBindings(settings, 'pane').pipe(
          map<Array<ContentBinding>, [Dataset, Array<ContentBinding>]>(bindings => [dataset, bindings])
        )),
        switchMap(([dataset, bindings]) => iif(
          () => bindings.length > 0,
          new Observable<[Dataset, Array<string>]>(obs => {
            forkJoin(
              dataset.results.map(row => from(bindings).pipe(
                map(binding => (metadata.get('panes') as Array<Pane>).find(p => p.name === binding.id)),
                switchMap(pane => iif(
                  () => pane.rule && pane.rule !== null && pane.rule.condition !== '',
                  this.rulesResolver.evaluate(pane.rule,[ ...(pane.contexts !== undefined ? pane.contexts : []), new InlineContext({ name: "_root", adaptor: 'data', data: row }) ]).pipe(
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
          if(r.renderer.type === 'pane') {
            return dataset.results.map((row, rowIndex) => {
              const attachedPane = (metadata.get('panes') as Array<Pane>).find(p => p.name === paneMappings[rowIndex]);
              const name = uuid.v4();
              return new Pane({ ...attachedPane, rule: undefined, label: name, contexts: [ new InlineContext({ name: "_root", adaptor: 'data', data: row })] });
            }) as Array<Pane>;
          } else {
            const contexts = [];
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
  getBindings(settings: Array<AttributeValue>, type: string, metadata?: Map<string, any>): Observable<Array<ContentBinding>> {
    if(type === 'context') {
      /*return this.toObject(settings).pipe(
        switchMap(r => this.getBindings(settings, 'pane')),
        map(pb => (metadata.get('panes') as Array<Pane>).find(p => p.name === ))
      );*/
      return of([]);
    } else {
      return this.toObject(settings).pipe(
        switchMap(rest => iif(
          () => rest.renderer.type === type,
          of(rest.renderer.bindings),
          of([])
        ))
      );
    }
  }
  toObject(settings: Array<AttributeValue>): Observable<Rest> {
    return of(this.attributeSerializer.deserializeAsObject(settings));
  }
  buildSettings(rest: Rest): Array<AttributeValue> {
    return this.attributeSerializer.serialize(rest, 'root').attributes;
  }
  getRenderType(settings: Array<AttributeValue>) : string {
    const renderType = [settings.find(s => s.name === 'renderer')].map(r => r.attributes.find(s => s.name === 'type'));
    return renderType.length > 0 ? renderType[0].value: undefined;
  }
}
