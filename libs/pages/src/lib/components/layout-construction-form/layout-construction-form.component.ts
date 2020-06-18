import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';

@Component({
  selector: 'classifieds-ui-layout-construction-form',
  templateUrl: './layout-construction-form.component.html',
  styleUrls: ['./layout-construction-form.component.scss']
})
export class LayoutConstructionFormComponent implements OnInit {

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

  constructor(private bs: MatBottomSheet, private pageBuilderFadcade: PageBuilderFacade) { }

  ngOnInit(): void {
    this.pageBuilderFadcade.getContentInstance$.subscribe(c => {
      console.log(c);
      this.bs.dismiss();
    });
  }

  changedOptions() {
    if (typeof(this.options.api) !== 'undefined' && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    //this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});

    // Add column
    this.dashboard.push({cols: 1, rows: 1, y: 0, x: this.dashboard.length});
  }

  addContent() {
    //this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});

    // alert('Add Panel');

    this.bs.open(ContentSelectorComponent);

    // Add column
    //this.dashboard.push({cols: 1, rows: 1, y: 0, x: this.dashboard.length});
  }

}
