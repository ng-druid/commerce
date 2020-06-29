import { Component, OnInit, Input, ComponentFactoryResolver, Inject, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Panel } from '../../models/page.models';
import { AttributeValue } from '@classifieds-ui/attributes';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { STYLE_PLUGIN, StylePlugin } from '@classifieds-ui/style';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { Pane } from '../../models/page.models';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'classifieds-ui-render-panel',
  templateUrl: './render-panel.component.html',
  styleUrls: ['./render-panel.component.scss']
})
export class RenderPanelComponent implements OnInit, OnChanges {

  static COUNTER = 0;

  @Input()
  panel: Panel;

  panes: Array<Pane>;

  stylePlugins: Array<StylePlugin> = [];
  stylePlugin: StylePlugin;

  contentPlugins: Array<ContentPlugin> = [];

  private counter: number;

  @ViewChild(PaneContentHostDirective, { static: true }) panelHost: PaneContentHostDirective;

  constructor(
    @Inject(STYLE_PLUGIN) stylePlugins: Array<StylePlugin>,
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private panelHandler: PanelContentHandler
  ) {
    this.counter = RenderPanelComponent.COUNTER++;
    this.stylePlugins = stylePlugins;
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      this.resolvePanes();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      this.resolvePanes();
    }
  }

  resolvePanes() {

    const panes$ = this.panel.panes.reduce<Array<Observable<Array<Pane>>>>((p, c, index) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler !== undefined && plugin.handler.isDynamic()) {
        return [ ...p, plugin.handler.buildDynamicItems(c.settings, `panel_${this.counter}_pane_${index}_data`).pipe(
          map(items => this.panelHandler.fromPanes(items)),
          map(panes => this.panelHandler.wrapPanel(panes).panes),
          take(1)
        )];
      } else {
        return of([c]);
      }
    }, []);

    forkJoin(panes$).pipe(
      map(paneGroups => paneGroups.reduce<Array<Pane>>((p, c) => [ ...p, ...c ], []))
    ).subscribe((panes: Array<Pane>) => {
      this.panes = panes;
      if(this.stylePlugin !== undefined) {
        this.renderPanelContent();
      }
    });

  }

  renderPanelContent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.stylePlugin.renderComponent);

    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.panel.settings;
    (componentRef.instance as any).panes = this.panes;

  }

}
