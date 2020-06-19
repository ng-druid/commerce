import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentProvider, CONTENT_PROVIDER } from '@classifieds-ui/content';

@Component({
  selector: 'classifieds-ui-content-editor-overlay',
  templateUrl: './content-editor-overlay.component.html',
  styleUrls: ['./content-editor-overlay.component.scss']
})
export class ContentEditorOverlayComponent implements OnInit {

  panel: number;

  contentForm = this.fb.group({
    panels: this.fb.array([])
  });

  private contentProviders: Array<ContentProvider> = [];

  get panels() {
    return (this.contentForm.get('panels') as FormArray);
  }

  constructor(
    @Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>,
    private fb: FormBuilder,
    private bs: MatBottomSheet
  ) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
  }

  addContent(index: number) {
    this.panel = index;
    this.bs.open(ContentSelectorComponent, { data: this.panels.controls[this.panel] });
  }

  onItemAdded() {
    this.panels.push(this.fb.group({
      panes: this.fb.array([])
    }));
  }

  onItemRemoved(index: number) {
    this.panels.removeAt(index);
  }

  onSave() {
    alert('save');
  }

  panelPanes(index: number): FormArray {
    return this.panels.at(index).get('panes') as FormArray;
  }

  panelPane(index: number, index2: number): FormGroup {
    return this.panelPanes(index).at(index2) as FormGroup;
  }

  panelPaneProvider(index: number, index2: number): string {
    return this.panelPane(index, index2).get('contentProvider').value;
  }

  panelPaneSettings(index: number, index2: number): string {
    return this.panelPane(index, index2).get('settings').value.map(s => new AttributeValue(s));
  }

  onPaneEdit(index: number, index2: number) {
    const provider = this.panelPaneProvider(index, index2);
    const contentProvider = this.contentProviders.find(p => p.name === provider);
    alert(`EDIT panel ${index} pane ${index2}`);
  }

  onPaneDelete(index: number, index2: number) {
    this.panelPanes(index).removeAt(index2);
  }

}
