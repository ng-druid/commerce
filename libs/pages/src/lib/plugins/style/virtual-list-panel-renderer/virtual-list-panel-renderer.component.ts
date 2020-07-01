import { Component, OnInit, Input, Inject } from '@angular/core';
import * as uuid from 'uuid';
import { AttributeValue } from '@classifieds-ui/attributes';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { Pane } from '../../../models/page.models';
import { PaneDatasourceService } from '../../../services/pane-datasource.service';
import { filter, concatMap, map, take, skip } from 'rxjs/operators';
import { PanelContentHandler } from '../../../handlers/panel-content.handler';

@Component({
  selector: 'classifieds-ui-virtual-list-panel-renderer',
  templateUrl: './virtual-list-panel-renderer.component.html',
  styleUrls: ['./virtual-list-panel-renderer.component.scss'],
  providers: [ PaneDatasourceService ]
})
export class VirtualListPanelRendererComponent implements OnInit {

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  panes: Array<Pane> = [];

  @Input()
  originPanes: Array<Pane>;

  @Input()
  originMappings: Array<number> = [];

  private contentPlugins: Array<ContentPlugin>;

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private panelHandler: PanelContentHandler,
    public paneDatasource: PaneDatasourceService
  ) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {

    const staticPanes = this.originPanes.reduce<Array<Pane>>((p, c) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler === undefined || !plugin.handler.isDynamic()) {
        return [ ...p, c ];
      } else {
        return [ ...p ];
      }
    }, []);

    this.paneDatasource.pageChange$.pipe(
      skip(1),
      filter(() => this.originPanes !== undefined && this.originPanes[0] !== undefined),
      map(page => [this.contentPlugins.find(c => c.name === this.originPanes[0].contentPlugin, ), page]),
      filter<[ContentPlugin, number]>(([contentPlugin, page]) => contentPlugin !== undefined && contentPlugin.handler !== undefined && contentPlugin.handler.isDynamic()),
      concatMap(([contentPlugin, page]) => contentPlugin.handler.buildDynamicItems(this.originPanes[0].settings, new Map([ ...(this.originPanes[0].metadata === undefined ? [] : this.originPanes[0].metadata), ['tag', uuid.v4()], ['page', page], ['panes', staticPanes] ]))),
      map(items => this.panelHandler.fromPanes(items)),
      map(panes => this.panelHandler.wrapPanel(panes).panes),
    ).subscribe((panes: Array<Pane>) => {
      this.paneDatasource.panes = panes;
    });
    this.paneDatasource.panes = this.panes;

  }

  trackByName(index: number, pane: Pane): string {
    return pane.name;
  }

}
