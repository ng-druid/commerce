import { Component, OnInit, EventEmitter, Output, ContentChild, TemplateRef, Input } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridType, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'classifieds-ui-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent implements OnInit {

  @Output()
  itemAdded = new EventEmitter();

  @Output()
  itemRemoved = new EventEmitter<number>();

  @Input()
  dashboard = []

  @Input()
  displayMainControls = true;

  @Input()
  displayItemHeader = true;

  @Input()
  options: GridsterConfig;

  rows = 0;

  get grid() {
    return this.dashboard;
  }

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
