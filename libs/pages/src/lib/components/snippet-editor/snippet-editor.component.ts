import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeTypes } from '@classifieds-ui/attributes';
import { Snippet } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss']
})
export class SnippetEditorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private panelFormGroup: FormGroup, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(snippet: Snippet) {
    (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
      contentPlugin: 'snippet',
      settings: this.fb.array([
        this.fb.group({
          name: new FormControl('content', Validators.required),
          type: new FormControl(AttributeTypes.Text, Validators.required),
          displayName: new FormControl('Content', Validators.required),
          value: new FormControl(snippet.content, Validators.required),
          computedValue: new FormControl(snippet.content, Validators.required),
        })
      ])
    }));
  }

}
