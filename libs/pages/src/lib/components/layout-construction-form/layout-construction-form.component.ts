import { Component, OnInit, ViewChildren, QueryList, ComponentFactoryResolver, Inject, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { PanelContentHostDirective } from '../../directives/panel-content-host.directive';
import { ContentProvider, CONTENT_PROVIDER, ContentInstance } from '@classifieds-ui/content';
import { filter } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'classifieds-ui-layout-construction-form',
  templateUrl: './layout-construction-form.component.html',
  styleUrls: ['./layout-construction-form.component.scss']
})
export class LayoutConstructionFormComponent implements OnInit {

  panel: number;

  options: GridsterConfig = {
    gridType: GridType.Fit,
    displayGrid: DisplayGrid.Always,
    pushItems: true,
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    }
  };

  dashboard = [
    /*{cols: 1, rows: 2, y: 0, x: 0},
    {cols: 1, rows: 2, y: 0, x: 1},
    {cols: 1, rows: 2, y: 0, x: 2},
    {cols: 1, rows: 2, y: 0, x: 3},
    {cols: 1, rows: 2, y: 0, x: 4},
    {cols: 1, rows: 2, y: 0, x: 5},
    {cols: 1, rows: 2, y: 0, x: 6},
    {cols: 1, rows: 2, y: 0, x: 7},*/
    /*{cols: 1, rows: 1, y: 0, x: 4},
    {cols: 3, rows: 2, y: 1, x: 4},
    {cols: 1, rows: 1, y: 4, x: 5},
    {cols: 1, rows: 1, y: 2, x: 1},
    {cols: 2, rows: 2, y: 5, x: 5},
    {cols: 2, rows: 2, y: 3, x: 2},
    {cols: 2, rows: 1, y: 2, x: 2},
    {cols: 1, rows: 1, y: 3, x: 4},
    {cols: 1, rows: 1, y: 0, x: 6}*/
  ];

  private contentProviders: Array<ContentProvider> = [];

  @ViewChild(MatMenuTrigger, {static: true}) menuTriggers: QueryList<MatMenuTrigger>
  @ViewChildren(PanelContentHostDirective) contentPanels: QueryList<PanelContentHostDirective>;

  constructor(
    @Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>,
    private bs: MatBottomSheet,
    private pageBuilderFadcade: PageBuilderFacade,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
    this.pageBuilderFadcade.getContentInstance$.pipe(
      filter(c => c !== undefined)
    ).subscribe(c => {
      this.bs.dismiss();
      this.renderPaneComponent(this.panel, c);
    });
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({cols: 1, rows: 1, y: 0, x: this.dashboard.length});
  }

  addContent(index: number) {
    this.panel = index;
    // this.menuTriggers.find((t, i) => i === index).closeMenu();
    this.bs.open(ContentSelectorComponent);
  }

  renderPaneComponent(index: number, contentInstance: ContentInstance) {

    console.log(`panels len: ${this.contentPanels.length}`);

    const provider = this.contentProviders.find(p => p.name === contentInstance.providerName);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(provider.renderComponent);

    const viewContainerRef = this.contentPanels.find((p, i) => i === index).viewContainerRef;
    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    /*(componentRef.instance as any).ad = this.ad;
    (componentRef.instance as any).adType = this.adType;
    (componentRef.instance as any).plugin = this.plugin;*/
  }

}
