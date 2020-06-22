import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridLayout } from '../../models/page.models';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';

@Component({
  selector: 'classifieds-ui-grid-layout-form',
  templateUrl: './grid-layout-form.component.html',
  styleUrls: ['./grid-layout-form.component.scss']
})
export class GridLayoutFormComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<GridLayout>();

  layoutForm = this.fb.group({});

  @ViewChild(GridLayoutComponent,{static: true}) gridLayout: GridLayoutComponent;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitted.emit(new GridLayout({
      id: undefined,
      site: 'main',
      gridItems: this.gridLayout.grid.map((gi, i) => ({ ...gi, weight: i })),
    }));
  }

}
