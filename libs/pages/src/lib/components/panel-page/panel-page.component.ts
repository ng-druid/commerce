import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { PanelPage } from '../../models/page.models';
import { DisplayGrid, GridsterConfig, GridType, GridsterItem } from 'angular-gridster2';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { InlineContext } from '../../models/context.models';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'classifieds-ui-panel-page',
  templateUrl: './panel-page.component.html',
  styleUrls: ['./panel-page.component.scss']
})
export class PanelPageComponent implements OnInit, OnChanges {

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

  constructor(
    es: EntityServices,
    private routerStore: Store<RouterReducerState>,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
    /*if(!this.nested) {
      console.log('hookup');
      const nav$ = fromEvent(this.el.nativeElement, 'click').pipe(
        //filter(evt => (evt as any).target.closest('a') !== null),
        tap(() => alert('Hello'))
      );
    }*/
    if(this.id !== undefined) {
      this.fetchPage();
    } else if(this.panelPage !== undefined) {
      this.populatePanelsFormArray();
    }
    if(!this.nested) {
      const { selectCurrentRoute } = getSelectors((state: any) => state.router);
      this.routerStore.pipe(
        select(selectCurrentRoute),
        filter(() => this.panelPage !== undefined)
      ).subscribe(route => {
          //this.panelPage = new PanelPage({ ...this.panelPage });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this.nested && !changes.id.firstChange && changes.id.previousValue !== changes.id.currentValue) {
      this.fetchPage();
    }
  }

  fetchPage() {
    this.panelPageService.getByKey(this.id).subscribe(p => {
      /*if(this.nested) {
        this.contexts =
      } else {
        this.contexts = [];
      }*/
      this.contexts = [];
      this.panelPage = p;
      this.populatePanelsFormArray();
    });
  }

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
    const panelPage = new PanelPage(this.pageForm.value);
  }

}
