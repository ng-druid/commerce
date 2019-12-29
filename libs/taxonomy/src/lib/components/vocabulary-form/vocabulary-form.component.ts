import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Vocabulary, Term } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-form',
  templateUrl: './vocabulary-form.component.html',
  styleUrls: ['./vocabulary-form.component.scss']
})
export class VocabularyFormComponent implements OnInit {

  @Input()
  vocabulary: Vocabulary;

  @Output()
  vocabularyChange = new EventEmitter<Vocabulary>();

  @Output()
  submitted = new EventEmitter();

  terms: Array<Term> = [];

  vocabularyFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.terms = this.vocabulary.terms;
    this.vocabularyFormGroup = this.fb.group({
      humanName: [ this.vocabulary.humanName , Validators.required],
      machineName: [ this.vocabulary.machineName , Validators.required]
    });
  }

  submit() {
    this.vocabulary = new Vocabulary({
      ...this.vocabulary,
      humanName: this.vocabularyFormGroup.controls.humanName.value,
      machineName: this.vocabularyFormGroup.controls.humanName.value,
      terms: this.terms
    });
    this.vocabularyChange.emit(this.vocabulary);
    this.submitted.emit();
  }

}
