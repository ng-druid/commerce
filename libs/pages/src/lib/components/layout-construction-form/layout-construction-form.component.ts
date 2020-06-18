import { Component, OnInit, ViewChildren, QueryList, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {DisplayGrid, GridsterConfig, GridType} from 'angular-gridster2';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { PanelContentHostDirective } from '../../directives/panel-content-host.directive';
import { ContentProvider, CONTENT_PROVIDER } from '@classifieds-ui/content';
import { AttributeValue } from '@classifieds-ui/attributes';
import { filter, tap } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
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
    private fb: FormBuilder
  ) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
    /*this.pageBuilderFadcade.getContentInstance$.pipe(
      filter(c => c !== undefined),
      tap(() => this.bs.dismiss())
    ).subscribe(c => {
      console.log(new Layout(this.layoutForm.value));
    });*/
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

  panelPanes(index: number): FormArray {
    return this.panels.at(index).get('panes') as FormArray;
  }

  panelPane(index: number, index2: number): FormGroup {
    return this.panelPanes(index).at(index2) as FormGroup;
  }

  panelPaneProvider(index: number, index2: number): string {
    return this.panelPane(index, index2).get('contentProvider').value;
  }

  panelPaneSettings(index: number, index2: number): string {
    return this.panelPane(index, index2).get('settings').value.map(s => new AttributeValue(s));
  }

  onPaneEdit(index: number, index2: number) {
    const provider = this.panelPaneProvider(index, index2);
    const contentProvider = this.contentProviders.find(p => p.name === provider);

    alert(`EDIT panel ${index} pane ${index2}`);
  }

  onPaneDelete(index: number, index2: number) {
    alert(`DELETE panel ${index} pane ${index2}`);
  }

}
