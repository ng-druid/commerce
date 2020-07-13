import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'classifieds-ui-context-editor',
  //templateUrl: './context-editor.component.html',
  styleUrls: ['./context-editor.component.scss'],
  template: `<ng-container [formGroup]="controlContainer.control"><classifieds-ui-rest-source-form formControlName="rest"></classifieds-ui-rest-source-form></ng-container>`
})
export class ContextEditorComponent implements OnInit {

  constructor(private fb: FormBuilder, public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    (this.controlContainer.control as FormGroup).addControl('rest', this.fb.control(''));
  }

}
