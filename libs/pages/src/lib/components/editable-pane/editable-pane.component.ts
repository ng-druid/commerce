import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, EventEmitter, Output, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentProvider, CONTENT_PROVIDER } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';

@Component({
  selector: 'classifieds-ui-editable-pane',
  templateUrl: './editable-pane.component.html',
  styleUrls: ['./editable-pane.component.scss']
})
export class EditablePaneComponent implements OnInit, OnChanges {

  @Input()
  providerName: string;

  @Input()
  settings: Array<AttributeValue> = [];

  @Output()
  edit = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  preview = false;

  contentProvider: ContentProvider;

  private contentProviders: Array<ContentProvider> = [];

  @ViewChild(PaneContentHostDirective, { static: true }) contentPaneHost: PaneContentHostDirective;

  constructor(@Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>, private componentFactoryResolver: ComponentFactoryResolver) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
    this.contentProvider = this.contentProviders.find(p => p.name === this.providerName);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contentProvider = this.contentProviders.find(p => p.name === this.providerName);
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

  onDisablePreviewClick() {
    this.preview = false;
    if(this.contentPaneHost !== undefined) {
      const viewContainerRef = this.contentPaneHost.viewContainerRef;
      viewContainerRef.clear();;
    }
  }

  renderPaneContent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentProvider.renderComponent);

    const viewContainerRef = this.contentPaneHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.settings;
  }

}
