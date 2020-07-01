import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { TokenizerService } from '@classifieds-ui/token';
import { MediaFile } from '@classifieds-ui/media';
import { AttributeValue, AttributeTypes } from '@classifieds-ui/attributes';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataSlice } from '../models/plugin.models';
import { InlineContext } from '../models/context.models';
import { MediaContentHandler } from './media-content.handler';
import { PanelContentHandler } from './panel-content.handler';
import { Pane, Panel, PanelPage } from '../models/page.models';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';

@Injectable()
export class SliceContentHandler implements ContentHandler {

  constructor(
    private tokenizerService: TokenizerService,
    private panelHandler: PanelContentHandler,
    private mediaHandler: MediaContentHandler
  ) { }

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
    return true;
  }

  buildDynamicItems(settings: Array<AttributeValue>, metadata: Map<string, any>): Observable<Array<AttributeValue>> {
    return this.toObject(settings).pipe(
      map(slice => [slice, metadata.get('contexts').find((c: InlineContext)  => c.name === slice.context)]),
      map(([slice, context]) => [slice, context, this.extractDataArray(context, slice.query)]),
      switchMap(([slice, context, dataArray]) => this.transformDataArray(dataArray, slice.plugin)),
      map(panes => new Panel({ stylePlugin: undefined, settings: [], panes })),
      map(panel => this.panelHandler.buildSettings(new PanelPage({ id: undefined, gridItems: [], panels: [ panel ] }))),
      map(panelSettings => panelSettings.find(s => s.name === 'panels').attributes[0].attributes.find(s => s.name === 'panes').attributes)
    );
  }

  toObject(settings: Array<AttributeValue>): Observable<DataSlice> {
    return of(new DataSlice({
      context: settings.find(s => s.name === 'context').value,
      query: settings.find(s => s.name === 'query').value,
      plugin: settings.find(s => s.name === 'plugin').value
    }));
  }

  buildSettings(dataSlice: DataSlice): Array<AttributeValue> {
    return [
      new AttributeValue({
        name: 'context',
        type: AttributeTypes.Text,
        displayName: 'Context',
        value: dataSlice.context,
        computedValue: dataSlice.context,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'query',
        type: AttributeTypes.Text,
        displayName: 'Query',
        value: dataSlice.query,
        computedValue: dataSlice.query,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'plugin',
        type: AttributeTypes.Text,
        displayName: 'Plugin',
        value: dataSlice.plugin,
        computedValue: dataSlice.plugin,
        intValue: 0,
        attributes: []
      })
    ];
  }

  extractDataArray(context: InlineContext, query: string): Array<any> {
    const pieces = query.split('.');
    const len = pieces.length;
    let current = context.data;
    for(let i = 0; i < len; i++) {
      if(pieces[i] === '') {
        continue;
      }
      current = current[pieces[i]];
    }
    return current;
  }

  transformDataArray(dataArray: Array<any>, plugin: string): Observable<Array<Pane>> {
    if(plugin === 'media') {
      return of(dataArray.map(d => new MediaFile(d)).map(m => new Pane({ contentPlugin: 'media', name: undefined, label: undefined, settings: this.mediaHandler.buildSettings(m) })));
    } else {
      return of();
    }
  }

}
