import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { TokenizerService } from '@classifieds-ui/token';
import { Rest } from '../../models/datasource.models';

@Component({
  selector: 'classifieds-ui-rest-form',
  templateUrl: './rest-form.component.html',
  styleUrls: ['./rest-form.component.scss']
})
export class RestFormComponent implements OnInit {

  @Input()
  panes: Array<string> = [];

  @Output()
  submitted = new EventEmitter<Rest>();

  contexts = [];
  forms = [];

  snippetValidation = true;

  tokens: Map<string, any>;

  restForm = this.fb.group({
    source: this.fb.control(''),
    renderer: this.fb.group({
      type: 'snippet',
      data: this.fb.control(''),
      bindings: this.fb.array([]),
      select: this.fb.group({
        value: this.fb.control(''),
        label: this.fb.control(''),
        id: this.fb.control(''),
        multiple: this.fb.control(''),
        limit: this.fb.control('')
      })
    })
  });

  get rendererType() {
    return this.restForm.get('renderer').get('type');
  }

  get isSelectable() {
    return this.restForm.get('renderer').get('type').value && this.restForm.get('renderer').get('type').value !== 'snippet' && this.restForm.get('renderer').get('type').value !== 'pane';
  }

  get bindings() {
    return this.restForm.get('renderer').get('bindings') as FormArray;
  }

  get valid() {
    return this.restForm.valid;
  }

  constructor(
    private fb: FormBuilder,
    private tokenizerService: TokenizerService
  ) {
  }

  ngOnInit(): void {
    this.restForm.get('renderer').get('type').valueChanges.subscribe(v => {
      if(this.rendererType.value === 'pane') {
        this.restForm.get('renderer').get('data').disable();
      } else {
        this.restForm.get('renderer').get('data').enable();
      }
      this.restForm.get('renderer').get('data').setValue({
        contentType: '',
        content: ''
      });
    });
    this.restForm.get('renderer').get('select').valueChanges.subscribe(v => {
      this.restForm.get('renderer').get('data').setValue({
        contentType: 'application/json',
        content: JSON.stringify({ value: v.value, label: v.label , id: v.id, multiple: v.multiple, limit: v.limit})
      });
    });
  }

  onDataChange(data: any) {
    this.tokens = this.tokenizerService.generateGenericTokens(data[0]);
  }

  addPane() {
    this.bindings.push(this.fb.group({
      type: this.fb.control('pane', Validators.required),
      id: this.fb.control('', Validators.required)
    }));
  }

  submit() {
    const rest = new Rest({
      ...this.restForm.value,
      url: this.restForm.value.source.url,
      params: this.restForm.value.source.params
    });
    this.submitted.emit(rest);
  }

}
