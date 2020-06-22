import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeTypes } from '@classifieds-ui/attributes';
import { Snippet, Pane } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss']
})
export class SnippetEditorComponent implements OnInit {

  snippet: Snippet;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { panelFormGroup: FormGroup; pane: Pane; paneIndex: number;  }, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.data.pane !== undefined) {
      this.snippet = new Snippet({
        content: this.data.pane.settings.find(s => s.name === 'content').value,
        contentType: this.data.pane.settings.find(s => s.name === 'contentType').value
      });
    }
  }

  onSubmit(snippet: Snippet) {
    if(this.data.paneIndex === undefined) {
      (this.data.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
        contentPlugin: 'snippet',
        settings: new FormArray(this.buildSettings(snippet))
      }));
    } else {
      const paneForm = (this.data.panelFormGroup.get('panes') as FormArray).at(this.data.paneIndex);
      (paneForm.get('settings') as FormArray).clear();
      this.buildSettings(snippet).forEach(s => {
        (paneForm.get('settings') as FormArray).push(s)
      });
    }
  }

  buildSettings(snippet: Snippet): Array<FormGroup> {
    return [
      this.fb.group({
        name: new FormControl('contentType', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('Content Type', Validators.required),
        value: new FormControl(snippet.contentType, Validators.required),
        computedValue: new FormControl(snippet.contentType, Validators.required),
      }),
      this.fb.group({
        name: new FormControl('content', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('Content', Validators.required),
        value: new FormControl(snippet.content, Validators.required),
        computedValue: new FormControl(snippet.content, Validators.required),
      })
    ];
  }

}
