import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';

@Component({
  selector: 'classifieds-ui-render-pane',
  templateUrl: './render-pane.component.html',
  styleUrls: ['./render-pane.component.scss']
})
export class RenderPaneComponent implements OnInit, OnChanges {

  @Input()
  pluginName: string;

  @Input()
  settings: Array<AttributeValue> = [];

  contentPlugin: ContentPlugin;

  private contentPlugins: Array<ContentPlugin> = [];

  @ViewChild(PaneContentHostDirective, { static: true }) contentPaneHost: PaneContentHostDirective;

  constructor(@Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>, private componentFactoryResolver: ComponentFactoryResolver) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    this.renderPaneContent();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    this.renderPaneContent();
  }

  renderPaneContent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentPlugin.renderComponent);

    const viewContainerRef = this.contentPaneHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.settings;
  }

}
