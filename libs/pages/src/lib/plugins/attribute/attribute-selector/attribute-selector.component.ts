import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ATTRIBUTE_WIDGET, AttributeWidget, AttributeValue, AttributeTypes} from '@classifieds-ui/attributes';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { AttributeContentHandler } from '../../../handlers/attribute-content.handler';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Pane } from '../../../models/page.models';
import { ContentSelectorComponent } from '../../../components/content-selector/content-selector.component';

@Component({
  selector: 'classifieds-ui-attribute-selector',
  templateUrl: './attribute-selector.component.html',
  styleUrls: ['./attribute-selector.component.scss']
})
export class AttributeSelectorComponent implements OnInit {

  @Input()
  panelFormGroup: FormGroup;

  attributeWidgets: Array<AttributeWidget> = [];
  private contentPlugin: ContentPlugin;

  constructor(
    @Inject(ATTRIBUTE_WIDGET) attributeWidgets: Array<AttributeWidget>,
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private bottomSheetRef: MatBottomSheetRef<ContentSelectorComponent>,
    private handler: AttributeContentHandler,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.attributeWidgets = attributeWidgets;
    this.contentPlugin = contentPlugins.find(p => p.name === 'attribute');
  }

  ngOnInit(): void {
  }

  onItemSelect(widget: AttributeWidget) {
    (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
      contentPlugin: 'attribute',
      settings: this.fb.array(this.buildSettings(widget).map(s => this.fb.group({
        name: new FormControl(s.name, Validators.required),
        type: new FormControl(s.type, Validators.required),
        displayName: new FormControl(s.displayName, Validators.required),
        value: new FormControl(s.value, Validators.required),
        computedValue: new FormControl(s.computedValue, Validators.required),
      })))
    }));
    const paneIndex = (this.panelFormGroup.get('panes') as FormArray).length - 1;
    const pane = new Pane((this.panelFormGroup.get('panes') as FormArray).at(paneIndex).value);
    this.dialog.open(this.contentPlugin.editorComponent, { data: { panelFormGroup: this.panelFormGroup, pane, paneIndex } });
    this.bottomSheetRef.dismiss();
  }

  buildSettings(widget: AttributeWidget): Array<AttributeValue> {
    return [
      new AttributeValue({
        name: 'widget',
        type: AttributeTypes.Text,
        displayName: 'Widget',
        value: widget.name,
        computedValue: widget.name,
        intValue: 0,
        attributes: []
      })
    ];
  }

}
