import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { Page } from '../../models/page.models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-page-construction-form',
  templateUrl: './page-construction-form.component.html',
  styleUrls: ['./page-construction-form.component.scss']
})
export class PageConstructionFormComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<Page>();

  pageForm = this.fb.group({
    site: ['main', Validators.required],
    path: ['', Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required],
    published: [false, Validators.required],
  })

  body: string;

  constructor(private fb: FormBuilder, private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.pageForm.get("body").valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(v => {
      this.body = v;
      /*this.body = this.markdownService.compile(v);
      console.log(this.body);*/
    })
  }

  submit(evt) {
    if (this.pageForm.valid) {
      this.submitted.emit(new Page(this.pageForm.value));
    }
  }

}
