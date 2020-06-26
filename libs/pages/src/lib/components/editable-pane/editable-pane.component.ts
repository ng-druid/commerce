import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, EventEmitter, Output, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { PanelPage } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-editable-pane',
  templateUrl: './editable-pane.component.html',
  styleUrls: ['./editable-pane.component.scss']
})
export class EditablePaneComponent implements OnInit, OnChanges {

  @Input()
  pluginName: string;

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  name: string;

  @Input()
  label: string;

  @Output()
  edit = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  rendererOverride = new EventEmitter();

  @Output()
  removeRendererOverride = new EventEmitter();

  displayOverride = false;
  hasOverride = false;

  contentPlugin: ContentPlugin;

  preview = false;

  private contentPlugins: Array<ContentPlugin> = [];

  panelPage: PanelPage;

  @ViewChild(PaneContentHostDirective, { static: false }) contentPaneHost: PaneContentHostDirective;

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private panelHandler: PanelContentHandler
  ) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    this.displayOverride = this.contentPlugin.handler.implementsRendererOverride();
    this.contentPlugin.handler.hasRendererOverride(this.settings).subscribe(r => this.hasOverride = !!r);
    if(this.pluginName === 'panel') {
      this.panelHandler.toObject(this.settings).subscribe(p => {
        this.panelPage = p;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    this.displayOverride = this.contentPlugin.handler.implementsRendererOverride();
    this.contentPlugin.handler.hasRendererOverride(this.settings).subscribe(r => this.hasOverride = !!r);
  }

  onEditClick() {
    this.edit.emit();
  }

  onDeleteClick() {
    this.delete.emit();
  }

  onPreviewClick() {
    this.preview = true;
    if(this.contentPaneHost !== undefined) {
      this.renderPaneContent();
    }
  }

  onOverrideClick() {
    this.rendererOverride.emit();
  }

  onRemoveOverrideClick() {
    this.removeRendererOverride.emit();
  }

  onDisablePreviewClick() {
    this.preview = false;
    if(this.contentPaneHost !== undefined) {
      const viewContainerRef = this.contentPaneHost.viewContainerRef;
      viewContainerRef.clear();;
    }
  }

  renderPaneContent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentPlugin.renderComponent);

    const viewContainerRef = this.contentPaneHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.settings;
  }

}
