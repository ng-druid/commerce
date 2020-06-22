import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Snippet } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-snippet-form',
  templateUrl: './snippet-form.component.html',
  styleUrls: ['./snippet-form.component.scss']
})
export class SnippetFormComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<Snippet>();

  @Input()
  set snippet(snippet: Snippet) {
    if(snippet !== undefined) {
      this.contentForm.setValue(snippet);
    }
  }

  contentForm = this.fb.group({
    content: this.fb.control('', Validators.required),
    contentType: this.fb.control('', Validators.required)
  });

  preview: string;
  isMarkdown = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contentForm.get("content").valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(v => {
      this.preview = v;
    })
    this.contentForm.get("contentType").valueChanges.subscribe(v => {
      this.isMarkdown = v === 'text/markdown'
    })
  }

  submit() {
    this.submitted.emit(new Snippet({
      content: this.contentForm.get('content').value,
      contentType: this.contentForm.get('contentType').value,
    }));
  }

}
