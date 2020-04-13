import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { AdTypePlugin, AdListItem } from '../../models/ads.models';
import { AdTypePluginDirective } from '../../directives/ad-type-plugin.directive';

@Component({
  selector: 'classifieds-ui-ad-list-item',
  styleUrls: ['./ad-list-item.component.scss'],
  template: `<ng-container><ng-template classifiedsUiAdTypePluginHost></ng-template></ng-container>`
})
export class AdListItemComponent implements OnInit {

  @Input()
  plugin: AdTypePlugin;

  @Input()
  ad: AdListItem;

  @Input()
  adType: string;

  @ViewChild(AdTypePluginDirective, {static: true}) pluginHost: AdTypePluginDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.plugin.listItemDisplay);

    const viewContainerRef = this.pluginHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).ad = this.ad;
    (componentRef.instance as any).adType = this.adType;
  }

}
