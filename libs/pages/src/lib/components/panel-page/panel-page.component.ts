import { Component, OnInit, Input } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { PanelPage } from '../../models/page.models';
import { DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';

@Component({
  selector: 'classifieds-ui-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.scss']
})
export class PanelPageComponent implements OnInit {

  @Input()
  id: string;

  panelPage: PanelPage;

  options: GridsterConfig = {
    gridType: GridType.Fit,
    displayGrid: DisplayGrid.None,
    pushItems: false,
    draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    }
  };

  private panelPageService: EntityCollectionService<PanelPage>

  constructor(es: EntityServices) {
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
    this.panelPageService.getByKey(this.id).subscribe(p => {
      this.panelPage = p;
    });
  }

}
