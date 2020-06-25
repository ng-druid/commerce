import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, EventEmitter, Output, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';

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

  contentPlugin: ContentPlugin;

  preview = false;

  private contentPlugins: Array<ContentPlugin> = [];

  @ViewChild(PaneContentHostDirective, { static: true }) contentPaneHost: PaneContentHostDirective;

  constructor(@Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>, private componentFactoryResolver: ComponentFactoryResolver) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
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
