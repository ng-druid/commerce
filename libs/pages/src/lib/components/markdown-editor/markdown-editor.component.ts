import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeTypes, AttributeValue } from '@classifieds-ui/attributes';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { ContentInstance } from '@classifieds-ui/content';

@Component({
  selector: 'classifieds-ui-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

  contentForm = this.fb.group({
    content: this.fb.control('', Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private panelFormGroup: FormGroup,
    private fb: FormBuilder,
    private pageBuilderFacade: PageBuilderFacade
  ) { }

  ngOnInit(): void {
  }

  submit() {
    (this.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
      contentProvider: 'markdown',
      settings: this.fb.array([
        this.fb.group({
          name: new FormControl('content', Validators.required),
          type: new FormControl(AttributeTypes.Text, Validators.required),
          displayName: new FormControl('Content', Validators.required),
          value: new FormControl(this.contentForm.get('content').value, Validators.required),
          computedValue: new FormControl(this.contentForm.get('content').value, Validators.required),
        })
      ])
    }));
    const settings = [new AttributeValue({
      name: 'content',
      type: AttributeTypes.Text,
      displayName: 'Content',
      value: this.contentForm.get('content').value,
      attributes: [],
      intValue: undefined,
      computedValue: undefined
    })];
    this.pageBuilderFacade.addContentInstance(new ContentInstance({ providerName: 'markdown', settings }));
  }

}
