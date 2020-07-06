import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { PanelPage } from '../../models/page.models';
import { DisplayGrid, GridsterConfig, GridType, GridsterItem } from 'angular-gridster2';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { InlineContext } from '../../models/context.models';

@Component({
  selector: 'classifieds-ui-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.scss']
})
export class PanelPageComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  panelPage: PanelPage;

  @Input()
  nested = false;

  @Input()
  contexts: Array<InlineContext>;

  pageForm = this.fb.group({
    panels: this.fb.array([])
  });

  options: GridsterConfig = {
    gridType: GridType.Fit,
    displayGrid: DisplayGrid.None,
    pushItems: false,
    draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    },
    mobileBreakpoint: 0
  };

  private panelPageService: EntityCollectionService<PanelPage>;

  @ViewChild(GridLayoutComponent, {static: false}) gridLayout: GridLayoutComponent;

  get panelsArray(): FormArray {
    return this.pageForm.get('panels') as FormArray;
  }

  constructor(es: EntityServices, private fb: FormBuilder) {
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
    if(this.id !== undefined) {
      this.panelPageService.getByKey(this.id).subscribe(p => {
        this.contexts = [];
        this.panelPage = p;
        this.populatePanelsFormArray();
      });
    } else if(this.panelPage !== undefined) {
      this.populatePanelsFormArray();
    }
  }

  /*ngOnChanges(changes: SimpleChanges) {
    if(this.nested) {
      console.log(`panel page change ${this.nested?'y':'n'}`);
      console.log(changes);
    }
  }*/

  onHeightChange(height: number, index: number) {
    this.gridLayout.setItemContentHeight(index, height);
  }

  populatePanelsFormArray() {
    this.panelsArray.clear();
    this.panelPage.panels.forEach((p, i) => {
      this.panelsArray.push(this.fb.control(''));
    });
  }

  submit() {
    console.log(this.pageForm.value);
    const panelPage = new PanelPage(this.pageForm.value);
    console.log(panelPage);
  }

}
