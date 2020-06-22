import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  contentForm = this.fb.group({
    content: this.fb.control('', Validators.required)
  });

  preview: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contentForm.get("content").valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(v => {
      this.preview = v;
    })
  }

  submit() {
    this.submitted.emit(new Snippet({
      content: this.contentForm.get('content').value,
      contentType: 'text/markdown',
    }));
  }

}
