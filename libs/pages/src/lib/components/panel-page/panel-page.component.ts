import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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

  constructor(es: EntityServices) {
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
    if(this.id !== undefined) {
      this.panelPageService.getByKey(this.id).subscribe(p => {
        this.contexts = [];
        this.panelPage = p;
      });
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

}
