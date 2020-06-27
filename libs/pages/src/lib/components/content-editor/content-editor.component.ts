import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, Input, ViewChildren, QueryList, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { StylePlugin, STYLE_PLUGIN } from '@classifieds-ui/style';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { MatDialog } from '@angular/material/dialog';
import { Pane, PanelPage } from '../../models/page.models';
import { DisplayGrid, GridsterConfig, GridType, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RenderingEditorComponent } from '../rendering-editor/rendering-editor.component';
import { debounceTime, delay, filter } from 'rxjs/operators';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { EditablePaneComponent } from '../editable-pane/editable-pane.component';
import { StyleSelectorComponent } from '../style-selector/style-selector.component';

@Component({
  selector: 'classifieds-ui-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnChanges {

  @Output()
  submitted = new EventEmitter<PanelPage>();

  @Output()
  nestedUpdate = new EventEmitter<PanelPage>();

  @Output()
  delete = new EventEmitter();

  @Input()
  panelPage: PanelPage;
  /*set panelPage(panelPage: PanelPage) {
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
            name: new FormControl(pp.name),
            label: new FormControl(pp.label),
            settings: new FormArray(pp.settings.map(s => this.convertToGroup(s)))
          }));
        });

      });
    } else {
      this.panelPageId = undefined;
      (this.contentForm.get('panels') as FormArray).clear();
    }
  }*/

  @Input()
  savable = true;

  @Input()
  nested = false;

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
    },
    mobileBreakpoint: 0,
    itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => {
      // console.log(item);
    },
    itemInitCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => {
      if(this.nested && item.y !== 0) {
        const matchIndex = this.gridLayout.grid.findIndex(g => g.x === item.x && g.y === item.y && g.cols === item.cols && g.rows === item.rows);
        if(this.panelPanes(matchIndex).length === 0) {
          this.gridLayout.setItemContentHeight(matchIndex, 200);
        } else {
        }
      }
    },
  };

  private contentPlugins: Array<ContentPlugin> = [];
  private stylePlugins: Array<StylePlugin> = [];

  @ViewChild(GridLayoutComponent, {static: false}) gridLayout: GridLayoutComponent;
  @ViewChildren('panes') paneContainers: QueryList<ElementRef>;
  @ViewChildren(EditablePaneComponent) editablePanes: QueryList<EditablePaneComponent>;

  get panels() {
    return (this.contentForm.get('panels') as FormArray);
  }

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    @Inject(STYLE_PLUGIN) stylePlugins: Array<StylePlugin>,
    private fb: FormBuilder,
    private bs: MatBottomSheet,
    private dialog: MatDialog,
    private panelHandler: PanelContentHandler
  ) {
    this.contentPlugins = contentPlugins;
    this.stylePlugins = stylePlugins;
  }

  ngOnInit(): void {
    this.contentForm.valueChanges.pipe(
      filter(() => this.nested),
      debounceTime(500)
    ).subscribe(() => {
      this.nestedUpdate.emit(this.packageFormData());
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.panelPage && changes.panelPage.previousValue !== changes.panelPage.currentValue) {
      this.panels.clear();
      this.panelPageId = changes.panelPage.currentValue.panelPageId;
      this.dashboard = [ ...changes.panelPage.currentValue.gridItems ];
      changes.panelPage.currentValue.panels.forEach((p, i) => {
        this.panels.push(this.fb.group({
          panes: this.fb.array([])
        }));
        if(this.nested) {
          this.panelPanes(this.panels.length - 1).valueChanges.pipe(
            //filter(() => this.nested),
            debounceTime(5),
            delay(1)
          ).subscribe(((panelIndex) => {
            return () => {
              const container = this.paneContainers.find((i, index) => index === panelIndex);
              this.gridLayout.setItemContentHeight(panelIndex, container.nativeElement.offsetHeight);
            };
          })(this.panels.length - 1));
        }
        p.panes.forEach((pp, i2) => {
          (this.panels.at(i).get('panes') as FormArray).push(this.fb.group({
            contentPlugin: pp.contentPlugin,
            name: new FormControl(pp.name),
            label: new FormControl(pp.label),
            settings: new FormArray(pp.settings.map(s => this.convertToGroup(s)))
          }));
        });
      });
    }
  }

  addContent(index: number) {
    this.bs.open(ContentSelectorComponent, { data: this.panels.controls[index] });
  }

  applyStyle(index: number) {
    this.bs.open(StyleSelectorComponent, { data: this.panels.controls[index] });
  }

  onItemAdded() {
    console.log('item added');

    this.panels.push(this.fb.group({
      stylePlugin: new FormControl(''),
      settings: new FormArray([]),
      panes: this.fb.array([])
    }));

    if(this.nested) {
      setTimeout(() => {
        this.paneContainers.forEach((p, i) => {
          this.gridLayout.setItemContentHeight(i, p.nativeElement.offsetHeight);
        });
      });
    }

    this.panelPanes(this.panels.length - 1).valueChanges.pipe(
      filter(() => this.nested),
      debounceTime(5),
      delay(1)
    ).subscribe(((panelIndex) => {
      return () => {
        const container = this.paneContainers.find((i, index) => index === panelIndex);
        this.gridLayout.setItemContentHeight(panelIndex, container.nativeElement.offsetHeight);
      };
    })(this.panels.length - 1))
  }

  onItemRemoved(index: number) {
    this.panels.removeAt(index);

    if(this.nested) {
      setTimeout(() => {
        this.paneContainers.forEach((p, i) => {
          this.gridLayout.setItemContentHeight(i, p.nativeElement.offsetHeight);
        });
      });
    }
  }

  onDrop(evt: CdkDragDrop<string[]>) {

    console.log(evt);

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

  onNestedUpdate(panelPage: PanelPage, index: number, index2: number) {
    const settings = this.panelHandler.buildSettings(panelPage);
    const formArray = (this.panelPane(index, index2).get('settings') as FormArray);
    formArray.clear();
    settings.forEach(s => formArray.push(this.convertToGroup(s)))
  }

  onPaneHeightChange(panelIndex: number) {
    if(this.nested) {
      const container = this.paneContainers.find((i, index) => index === panelIndex);
      this.gridLayout.setItemContentHeight(panelIndex, container.nativeElement.offsetHeight);
    }
  }

  onDeleteClick() {
    this.delete.emit();
  }

  onDeletePane(index: number, index2: number) {
    console.log(`delete nested pane: ${index} | ${index2}`);
  }

  submit() {
    this.submitted.emit(this.packageFormData());
  }

  packageFormData(): PanelPage {
    this.syncNestedPanelPages();
    return new PanelPage({
      id: this.panelPageId,
      gridItems: this.gridLayout.grid.map((gi, i) => ({ ...gi, weight: i })),
      panels: this.panels.value
    });
  }

  syncNestedPanelPages() {
    this.editablePanes.forEach(p => {
      if(p.contentEditor !== undefined) {
        const settings = this.panelHandler.buildSettings((p.contentEditor as ContentEditorComponent).packageFormData());
        const formArray = (this.panelPane(p.panelIndex, p.paneIndex).get('settings') as FormArray);
        formArray.clear();
        settings.forEach(s => formArray.push(this.convertToGroup(s)))
      }
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

  panelPaneSettings(index: number, index2: number): Array<AttributeValue> {
    return this.panelPane(index, index2).get('settings').value.map(s => new AttributeValue(s));
  }

  panelPaneName(index: number, index2: number): string {
    return this.panelPane(index, index2).get('name').value;
  }

  panelPaneLabel(index: number, index2: number): string {
    return this.panelPane(index, index2).get('label').value;
  }

  panelPaneIsNested(index: number, index2: number): boolean {
    return this.panelPanePlugin(index, index2) === 'panel';
  }

  panelPanePanelPage(index: number, index2: number): PanelPage {
    let panelPage;
    this.panelHandler.toObject(this.panelPaneSettings(index, index2)).subscribe(p => {
      panelPage = p;
    });
    return panelPage;
  }

  hasPanelStyle(index: number) {
    return this.panels.at(index).get('stylePlugin').value !== '';
  }

  panelStyleTitle(index: number) {
    return this.stylePlugins.find(s => s.name === this.panels.at(index).get('stylePlugin').value).title;
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

  convertToGroup(setting: AttributeValue): FormGroup {

    const fg = this.fb.group({
      name: new FormControl(setting.name, Validators.required),
      type: new FormControl(setting.type, Validators.required),
      displayName: new FormControl(setting.displayName, Validators.required),
      value: new FormControl(setting.value, Validators.required),
      computedValue: new FormControl(setting.value, Validators.required),
      attributes: new FormArray([])
    });

    if(setting.attributes && setting.attributes.length > 0) {
      setting.attributes.forEach(s => {
        (fg.get('attributes') as FormArray).push(this.convertToGroup(s));
      })
    }

    return fg;

  }

}
