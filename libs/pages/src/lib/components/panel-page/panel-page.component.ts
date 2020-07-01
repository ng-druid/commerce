import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
    mobileBreakpoint: 0,
    itemResizeCallback: (item: GridsterItem) => {
      if(this.nested) {
        const matchIndex = this.gridLayout.grid.findIndex(g => g.x === item.x && g.y === item.y && g.cols === item.cols && g.rows === item.rows);
        this.gridLayout.setItemContentHeight(matchIndex, 150);
      }
    }
  };

  private panelPageService: EntityCollectionService<PanelPage>;

  @ViewChild(GridLayoutComponent, {static: false}) gridLayout: GridLayoutComponent;

  constructor(es: EntityServices) {
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
    if(this.id !== undefined) {
      this.panelPageService.getByKey(this.id).subscribe(p => {
        this.panelPage = p;
      });
    }
  }

}
