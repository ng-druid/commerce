import { Component, OnInit, Inject, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { CONTENT_PROVIDER, ContentProvider } from '@classifieds-ui/content';
import { ContentSelectionHostDirective } from '../../directives/content-selection-host.directive';

@Component({
  selector: 'classifieds-ui-content-selector',
  templateUrl: './content-selector.component.html',
  styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

  selectedIndex = 0
  provider: ContentProvider;

  contentProviders: Array<ContentProvider> = [];

  @ViewChild(ContentSelectionHostDirective, {static: true}) selectionHost: ContentSelectionHostDirective;

  constructor(@Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>, private componentFactoryResolver: ComponentFactoryResolver) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
  }

  onEntitySelected(provider: ContentProvider) {
    this.provider = provider;
    this.selectedIndex = 1;
    this.renderSelectionComponent();
  }

  renderSelectionComponent() {
    console.log(this.provider);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.provider.selectionComponent);

    const viewContainerRef = this.selectionHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    /*(componentRef.instance as any).ad = this.ad;
    (componentRef.instance as any).adType = this.adType;
    (componentRef.instance as any).plugin = this.plugin;*/
  }

}
