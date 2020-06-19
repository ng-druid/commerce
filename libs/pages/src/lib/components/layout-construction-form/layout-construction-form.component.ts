import { Component, OnInit, EventEmitter, Output, ContentChild, TemplateRef } from '@angular/core';
import {DisplayGrid, GridsterConfig, GridType} from 'angular-gridster2';
import { Layout } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-layout-construction-form',
  templateUrl: './layout-construction-form.component.html',
  styleUrls: ['./layout-construction-form.component.scss']
})
export class LayoutConstructionFormComponent implements OnInit {

  /*@Output()
  saved = new EventEmitter<Layout>();*/

  @Output()
  itemAdded = new EventEmitter();

  @Output()
  itemRemoved = new EventEmitter<number>();

  rows = 0;

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

  @ContentChild('gridItemActions') gridItemActionsTmpl: TemplateRef<any>;
  @ContentChild('innerGridItem') innerGridItemTmpl: TemplateRef<any>;
  @ContentChild('extraActions') extraActionsTmpl: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}

  removeItem(index: number) {
    this.dashboard.splice(index, 1);
    this.itemRemoved.emit(index);
  }

  addColumn() {
    this.dashboard.push({cols: 1, rows: 1, y: 0, x: this.dashboard.length});
    this.itemAdded.emit();
  }

  addRow() {
    this.dashboard.push({cols: 1, rows: 1, y: this.rows++, x: 0});
    this.itemAdded.emit();
  }

}
