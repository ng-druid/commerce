import { Component, OnInit, Inject } from '@angular/core';
import { AttributeValue } from '@classifieds-ui/attributes';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestContentHandler } from '../../../handlers/rest-content-handler.service';
import { Rest } from '../../../models/datasource.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pane } from '../../../models/page.models';

@Component({
  selector: 'classifieds-ui-rest-editor',
  templateUrl: './rest-editor.component.html',
  styleUrls: ['./rest-editor.component.scss']
})
export class RestEditorComponent implements OnInit {

  panelFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { panelFormGroup: FormGroup; pane: Pane; paneIndex: number;  },
    private dialogRef: MatDialogRef<RestEditorComponent>,
    private fb: FormBuilder,
    private handler: RestContentHandler
  ) { }

  ngOnInit(): void {
  }

  submitted(rest: Rest) {
    (this.data.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
      contentPlugin: 'rest',
      name: new FormControl(''),
      label: new FormControl(''),
      settings: this.fb.array(this.handler.buildSettings(rest).map(s => this.convertToGroup(s)))
    }));
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
