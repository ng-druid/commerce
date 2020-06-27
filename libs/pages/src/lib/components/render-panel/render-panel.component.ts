import { Component, OnInit, Input, ComponentFactoryResolver, Inject, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Panel } from '../../models/page.models';
import { STYLE_PLUGIN, StylePlugin } from '@classifieds-ui/style';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';

@Component({
  selector: 'classifieds-ui-render-panel',
  templateUrl: './render-panel.component.html',
  styleUrls: ['./render-panel.component.scss']
})
export class RenderPanelComponent implements OnInit, OnChanges {

  @Input()
  panel: Panel;

  stylePlugins: Array<StylePlugin> = [];
  stylePlugin: StylePlugin;

  @ViewChild(PaneContentHostDirective, { static: true }) panelHost: PaneContentHostDirective;

  constructor(
    @Inject(STYLE_PLUGIN) stylePlugins: Array<StylePlugin>,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.stylePlugins = stylePlugins;
  }

  ngOnInit(): void {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.stylePlugin !== undefined && this.panelHost !== undefined) {
      this.renderPanelContent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.stylePlugin !== undefined && this.panelHost !== undefined) {
      this.renderPanelContent();
    }
  }

  renderPanelContent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.stylePlugin.renderComponent);

    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.panel.settings;
    (componentRef.instance as any).panes = this.panel.panes;
  }

}
