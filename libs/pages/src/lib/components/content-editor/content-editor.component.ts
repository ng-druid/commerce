import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { MatDialog } from '@angular/material/dialog';
import { Pane, PanelPage } from '../../models/page.models';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';

@Component({
  selector: 'classifieds-ui-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit {

  contentForm = this.fb.group({
    panels: this.fb.array([])
  });

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

  private contentPlugins: Array<ContentPlugin> = [];

  private panelPageService: EntityCollectionService<PanelPage>;

  @ViewChild(GridLayoutComponent, {static: true}) gridLayout: GridLayoutComponent;

  get panels() {
    return (this.contentForm.get('panels') as FormArray);
  }

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private fb: FormBuilder,
    private bs: MatBottomSheet,
    private dialog: MatDialog,
    es: EntityServices
  ) {
    this.contentPlugins = contentPlugins;
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
  }

  addContent(index: number) {
    this.bs.open(ContentSelectorComponent, { data: this.panels.controls[index] });
  }

  onItemAdded() {
    this.panels.push(this.fb.group({
      panes: this.fb.array([])
    }));
  }

  onItemRemoved(index: number) {
    this.panels.removeAt(index);
  }

  submit() {
    const panelPage = new PanelPage({
      id: undefined,
      gridItems: this.gridLayout.grid.map((gi, i) => ({ ...gi, weight: i })),
      panels: this.panels.value
    });
    this.panelPageService.add(panelPage).subscribe(() => {
      alert('panel page created');
    });
  }

  panelPanes(index: number): FormArray {
    return this.panels.at(index).get('panes') as FormArray;
  }

  panelPane(index: number, index2: number): FormGroup {
    return this.panelPanes(index).at(index2) as FormGroup;
  }

  panelPanePlugin(index: number, index2: number): string {
    return this.panelPane(index, index2).get('contentPlugin').value;
  }

  panelPaneSettings(index: number, index2: number): string {
    return this.panelPane(index, index2).get('settings').value.map(s => new AttributeValue(s));
  }

  onPaneEdit(index: number, index2: number) {
    const pane = new Pane(this.panelPane(index, index2).value);
    const plugin = this.panelPanePlugin(index, index2);
    const contentPlugin = this.contentPlugins.find(p => p.name === plugin);
    if(contentPlugin.editorComponent !== undefined) {
      const dialogRef = this.dialog.open(contentPlugin.editorComponent, { data: { panelFormGroup: this.panels.at(index), paneIndex: index2, pane } });
    }
  }

  onPaneDelete(index: number, index2: number) {
    this.panelPanes(index).removeAt(index2);
  }

}
