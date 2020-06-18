import { Component, OnInit, ViewChildren, QueryList, ComponentFactoryResolver, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { PanelContentHostDirective } from '../../directives/panel-content-host.directive';
import { ContentProvider, CONTENT_PROVIDER, ContentInstance } from '@classifieds-ui/content';
import { filter } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { EditablePaneComponent } from '../editable-pane/editable-pane.component';
import { Layout } from '../../models/page.models';

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

  dashboard = [];

  layoutForm = this.fb.group({
    panels: this.fb.array([])
  });

  private contentProviders: Array<ContentProvider> = [];

  @ViewChild(MatMenuTrigger, {static: true}) menuTriggers: QueryList<MatMenuTrigger>
  @ViewChildren(PanelContentHostDirective) contentPanels: QueryList<PanelContentHostDirective>;

  get panels() {
    return (this.layoutForm.get('panels') as FormArray);
  }

  constructor(
    @Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>,
    private bs: MatBottomSheet,
    private pageBuilderFadcade: PageBuilderFacade,
    private componentFactoryResolver: ComponentFactoryResolver,
    private fb: FormBuilder
  ) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
    this.pageBuilderFadcade.getContentInstance$.pipe(
      filter(c => c !== undefined)
    ).subscribe(c => {
      this.bs.dismiss();
      console.log(new Layout(this.layoutForm.value));
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
    this.panels.push(this.fb.group({
      panes: this.fb.array([])
    }));
  }

  addContent(index: number) {
    this.panel = index;
    // this.menuTriggers.find((t, i) => i === index).closeMenu();
    this.bs.open(ContentSelectorComponent, { data: this.panels.controls[this.panel] });
  }

  renderPaneComponent(index: number, contentInstance: ContentInstance) {

    console.log(`panels len: ${this.contentPanels.length}`);

    const provider = this.contentProviders.find(p => p.name === contentInstance.providerName);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditablePaneComponent);

    const viewContainerRef = this.contentPanels.find((p, i) => i === index).viewContainerRef;
    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    (componentRef.instance as any).contentInstance = contentInstance;
    (componentRef.instance as any).contentProvider = provider;
    //(componentRef.instance as any).plugin = this.plugin;*/
  }

}
