import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'classifieds-ui-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.scss']
})
export class PageBuilderComponent implements OnInit {

  pageForm = this.fb.group({
    context: this.fb.group({}),
    rules: this.fb.group({}),
    layout: this.fb.group({}),
    content: this.fb.group({})
  });

  get contextForm(): FormGroup {
    return this.pageForm.get('context') as FormGroup;
  }

  get rulesForm(): FormGroup {
    return this.pageForm.get('rules') as FormGroup;
  }

  get layoutForm(): FormGroup {
    return this.pageForm.get('layout') as FormGroup;
  }

  get contentForm(): FormGroup {
    return this.pageForm.get('content') as FormGroup;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
