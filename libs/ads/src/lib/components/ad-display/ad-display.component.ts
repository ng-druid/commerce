import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type, OnChanges, SimpleChanges } from '@angular/core';
import { AdTypePlugin, AdListItem, AdType } from '../../models/ads.models';
import { AdDisplayDirective } from '../../directives/ad-display.directive';

@Component({
  selector: 'classifieds-ui-ad-display',
  styleUrls: ['./ad-display.component.scss'],
  template: `<ng-container><ng-template classifiedsUiAdDisplayHost></ng-template></ng-container>`
})
export class AdDisplayComponent implements OnInit, OnChanges {
  @Input()
  plugin: AdTypePlugin;

  @Input()
  ad: AdListItem;

  @Input()
  adType: AdType;

  @Input()
  display: string;

  @ViewChild(AdDisplayDirective, {static: true}) displayHost: AdDisplayDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    // this.rebuild()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.ad || !changes.ad.previousValue || (changes.ad.previousValue.id !== changes.ad.currentValue.id)) {
      this.rebuild();
    }
  }

  rebuild() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.plugin[this.display]);

    const viewContainerRef = this.displayHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).ad = this.ad;
    (componentRef.instance as any).adType = this.adType;
    (componentRef.instance as any).plugin = this.plugin;
  }
}
