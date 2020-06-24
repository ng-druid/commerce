import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttributeWidget, Attribute, AttributeValue, ATTRIBUTE_WIDGET, AttributeTypes } from '@classifieds-ui/attributes';
import { Pane } from '../../../models/page.models';
import { AttributeContentHandler } from '../../../handlers/attribute-content.handler';

@Component({
  selector: 'classifieds-ui-attribute-editor',
  templateUrl: './attribute-editor.component.html',
  styleUrls: ['./attribute-editor.component.scss']
})
export class AttributeEditorComponent implements OnInit {

  widget: AttributeWidget;

  attributes: Array<Attribute> = [];
  attributeValues: Array<AttributeValue> = [];

  attributesFormGroup = this.fb.group({
    name: new FormControl(''),
    label: new FormControl(''),
    attributes: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { panelFormGroup: FormGroup; pane: Pane; paneIndex: number;  },
    @Inject(ATTRIBUTE_WIDGET) attributeWidgets: Array<AttributeWidget>,
    private dialogRef: MatDialogRef<AttributeEditorComponent>,
    private fb: FormBuilder,
    private handler: AttributeContentHandler
  ) {
    const widgetSetting = this.data.pane.settings.find(s => s.name === 'widget');
    this.widget = attributeWidgets.find(w => w.name === widgetSetting.value);
  }

  ngOnInit(): void {
    const value = this.data.pane.settings.find(s => s.name === 'value');
    this.attributes = [new Attribute({ ...this.widget.schema, widget: this.widget.name, label: 'Value', name: 'value' })];
    if(value !== undefined) {
      this.attributeValues = this.handler.valueSettings(this.data.pane.settings);
    } else {
      this.attributeValues = [new AttributeValue({
        name: 'value',
        type: this.widget.schema.type,
        displayName: 'Value',
        value: '',
        computedValue: '',
        intValue: 0,
        attributes: []
      })];
    }
  }

  submit() {
    const pane = new Pane({ contentPlugin: 'attribute', settings: this.attributesFormGroup.get('attributes').value });
    console.log(pane);
    const formArray = ((this.data.panelFormGroup.get('panes') as FormArray).at(this.data.paneIndex).get('settings') as FormArray);
    formArray.clear();
    [ ...this.handler.widgetSettings(this.widget), ...pane.settings].forEach(s => formArray.push(this.convertToGroup(s)));
    this.dialogRef.close();
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
