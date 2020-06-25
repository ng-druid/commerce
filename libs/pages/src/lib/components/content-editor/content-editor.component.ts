import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { MatDialog } from '@angular/material/dialog';
import { Pane, PanelPage } from '../../models/page.models';
import { DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RenderingEditorComponent } from '../rendering-editor/rendering-editor.component';

@Component({
  selector: 'classifieds-ui-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<PanelPage>();

  @Input()
  set panelPage(panelPage: PanelPage) {
    if(panelPage !== undefined) {
      this.panelPageId = panelPage.id;
      this.dashboard = [ ...panelPage.gridItems ];
      panelPage.panels.forEach((p, i) => {
        this.panels.push(this.fb.group({
          panes: this.fb.array([])
        }));
        p.panes.forEach((pp, i2) => {
          (this.panels.at(i).get('panes') as FormArray).push(this.fb.group({
            contentPlugin: pp.contentPlugin,
            settings: new FormArray(this.buildSettings(pp.settings))
          }));
        });
      });
    } else {
      this.panelPageId = undefined;
      (this.contentForm.get('panels') as FormArray).clear();
    }
  }

  panelPageId: string;
  dashboard = [];

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

  @ViewChild(GridLayoutComponent, {static: true}) gridLayout: GridLayoutComponent;

  get panels() {
    return (this.contentForm.get('panels') as FormArray);
  }

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private fb: FormBuilder,
    private bs: MatBottomSheet,
    private dialog: MatDialog
  ) {
    this.contentPlugins = contentPlugins;
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

  onDrop(evt: CdkDragDrop<string[]>) {

    const newPanelIndex = +evt.container.data;
    const oldPanelIndex = +evt.previousContainer.data;

    if(newPanelIndex === oldPanelIndex) {
      const dir = evt.currentIndex > evt.previousIndex ? 1 : -1;

      const from = evt.previousIndex;
      const to = evt.currentIndex;

      const temp = this.panelPanes(newPanelIndex).at(from);
      for (let i = from; i * dir < to * dir; i = i + dir) {
        const current = this.panelPanes(newPanelIndex).at(i + dir);
        this.panelPanes(newPanelIndex).setControl(i, current);
      }
      this.panelPanes(newPanelIndex).setControl(to, temp);
    } else {
      const temp = this.panelPanes(oldPanelIndex).at(evt.previousIndex);
      this.panelPanes(oldPanelIndex).removeAt(evt.previousIndex);
      this.panelPanes(newPanelIndex).insert(evt.currentIndex, temp);
    }

  }

  onOverrideRenderer(index: number, index2: number) {
    const pane = new Pane(this.panelPane(index, index2).value);
    this.dialog.open(RenderingEditorComponent, { data: { panelFormGroup: this.panels.at(index), paneIndex: index2, pane } });
  }

  onRemoveOverrideRenderer(index: number, index2: number) {
    const formArray = this.panelPane(index, index2).get('settings') as FormArray;
    let rendererIndex;
    formArray.controls.forEach((c, i) => {
      if(c.get('name').value === '_renderer') {
        rendererIndex = i;
      }
    });
    if(rendererIndex !== undefined) {
      formArray.removeAt(rendererIndex);
    }
  }

  submit() {
    const panelPage = new PanelPage({
      id: this.panelPageId,
      gridItems: this.gridLayout.grid.map((gi, i) => ({ ...gi, weight: i })),
      panels: this.panels.value
    });
    this.submitted.emit(panelPage);
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

  panelPaneName(index: number, index2: number): string {
    return this.panelPane(index, index2).get('name').value;
  }

  panelPaneLabel(index: number, index2: number): string {
    return this.panelPane(index, index2).get('label').value;
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

  onFileChange(event: any, index: number) {
    const file: File = event.addedFiles[0];
    const plugin = this.contentPlugins.filter(p => p.handler !== undefined).find(p => p.handler.handlesType(file.type));
    if(plugin !== undefined) {
      plugin.handler.handleFile(file).subscribe(settings => {
        this.panelPanes(index).push(this.fb.group({
          contentPlugin: plugin.name,
          name: new FormControl(''),
          label: new FormControl(''),
          settings: this.fb.array(settings.map(s => this.fb.group({
            name: new FormControl(s.name, Validators.required),
            type: new FormControl(s.type, Validators.required),
            displayName: new FormControl(s.displayName, Validators.required),
            value: new FormControl(s.value, Validators.required),
            computedValue: new FormControl(s.value, Validators.required),
          })))
        }));
      });
    }
  }

  buildSettings(settings: Array<AttributeValue>): Array<FormGroup> {
    return settings.map(s => this.fb.group({
      name: new FormControl(s.name, Validators.required),
      type: new FormControl(s.type, Validators.required),
      displayName: new FormControl(s.displayName, Validators.required),
      value: new FormControl(s.value, Validators.required),
      computedValue: new FormControl(s.computedValue, Validators.required),
    }));
  }

}
