import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { PanelPage, Pane } from '../../models/page.models';
import { InlineContext } from '../../models/context.models';

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

  @Input()
  contexts: Array<InlineContext>;

  @Input()
  originPane: Pane;

  contentPlugin: ContentPlugin;

  panelPage: PanelPage;

  private contentPlugins: Array<ContentPlugin> = [];

  @ViewChild(PaneContentHostDirective, { static: true }) contentPaneHost: PaneContentHostDirective;

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private panelHandler: PanelContentHandler
  ) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    if(this.pluginName === 'panel') {
      this.resolveNestedPanelPage();
    } else {
      this.renderPaneContent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    if(this.pluginName === 'panel') {
      this.resolveNestedPanelPage();
    } else {
      this.renderPaneContent();
    }
  }

  resolveNestedPanelPage() {
    this.panelHandler.toObject(this.settings).subscribe(p => {
      this.panelPage = p;
    });
  }

  renderPaneContent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentPlugin.renderComponent);

    const viewContainerRef = this.contentPaneHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.settings;
    (componentRef.instance as any).contexts = this.contexts.map(c => new InlineContext(c));
  }

}
