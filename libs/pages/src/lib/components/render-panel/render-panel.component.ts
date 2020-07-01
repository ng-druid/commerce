import { Component, OnInit, Input, ComponentFactoryResolver, Inject, ViewChild, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Panel } from '../../models/page.models';
import { AttributeValue } from '@classifieds-ui/attributes';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { STYLE_PLUGIN, StylePlugin } from '@classifieds-ui/style';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { Pane } from '../../models/page.models';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { switchMap, map, tap, take, filter } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';
import { InlineContext } from '../../models/context.models';

@Component({
  selector: 'classifieds-ui-render-panel',
  templateUrl: './render-panel.component.html',
  styleUrls: ['./render-panel.component.scss']
})
export class RenderPanelComponent implements OnInit, OnChanges {

  static COUNTER = 0;

  @Input()
  panel: Panel;

  @Input()
  contexts: Array<InlineContext>;

  panes: Array<Pane>;

  resolvedPanes: Array<Pane>;
  originMappings: Array<number> = [];

  stylePlugins: Array<StylePlugin> = [];
  stylePlugin: StylePlugin;

  contentPlugins: Array<ContentPlugin> = [];

  private counter: number;

  @ViewChild(PaneContentHostDirective, { static: true }) panelHost: PaneContentHostDirective;
  // @ViewChild('panes', { static: false }) paneContainer: ElementRef;

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

    const staticPanes = this.panel.panes.reduce<Array<Pane>>((p, c) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler === undefined || !plugin.handler.isDynamic()) {
        return [ ...p, c ];
      } else {
        return [ ...p ];
      }
    }, []);

    const panes$ = this.panel.panes.reduce<Array<Observable<Array<Pane>>>>((p, c, index) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(c.name === 'a02522e4-dfa7-4f2f-ad64-b5a9d0130f03') {
        return [ ...p ];
      }
      if(plugin.handler !== undefined && plugin.handler.isDynamic()) {
        return [ ...p, plugin.handler.buildDynamicItems(c.settings, new Map<string, any>([ ...(c.metadata === undefined ? [] : c.metadata), ['panes', staticPanes], ['contexts', this.mergeContexts(c.contexts)] ])).pipe(
          map(items => this.panelHandler.fromPanes(items)),
          map(panes => this.panelHandler.wrapPanel(panes).panes),
          take(1)
        )];
      } else {
        return [ ...p, of([ c ])];
      }
    }, []);

    forkJoin(panes$).pipe(
      tap(paneGroups => {
        this.resolvedPanes = [];
        this.originMappings = [];
        paneGroups.forEach((panes, index) => {
          this.resolvedPanes = [ ...(this.resolvedPanes === undefined ? [] : this.resolvedPanes), ...panes ];
          this.originMappings = [ ...(this.originMappings ? [] : this.originMappings), ...panes.map(() => index)];
          /*if(this.stylePlugin === undefined && this.paneContainer !== undefined) {
            setTimeout(() => console.log(this.paneContainer.nativeElement.offsetHeight));
          }*/
        });
      }),
      filter(() => this.stylePlugin !== undefined)
    ).subscribe(() => {
      this.renderPanelContent();
    });

  }

  renderPanelContent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.stylePlugin.renderComponent);

    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.panel.settings;
    (componentRef.instance as any).panes = this.resolvedPanes;
    (componentRef.instance as any).originPanes = this.panel.panes;
    (componentRef.instance as any).originMappings = this.originMappings;
    (componentRef.instance as any).contexts = this.contexts;

  }

  mergeContexts(contexts: Array<InlineContext>): Array<InlineContext> {
    return [ ...( this.contexts !== undefined ? this.contexts : [] ), ...( contexts !== undefined ? contexts : [] ) ];
  }

}
