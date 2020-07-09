import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { Pane } from '../../models/page.models';
import { InlineContext } from '../../models/context.models';
import { RulesParserService } from '../../services/rules-parser.service';

@Component({
  selector: 'classifieds-ui-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss']
})
export class RulesDialogComponent implements OnInit {

  rulesForm = this.fb.group({
    rules: this.fb.control('')
  });

  config: QueryBuilderConfig = {
    fields: {
      /*age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      }*/
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { contexts: Array<InlineContext> },
    private dialogRef: MatDialogRef<RulesDialogComponent>,
    private fb: FormBuilder,
    private rulesParser:  RulesParserService
  ) { }

  ngOnInit(): void {
    this.data.contexts.forEach(c => {
      this.rulesParser.buildFields(c.data, c.name).forEach((f, k) => {
        this.config.fields[k] = f;
      });
    });
    /*this.rulesForm.get('rules').valueChanges.subscribe(v => {
      console.log(this.rulesParser.toEngineRule(v).toJSON());
    });*/
  }

  submit() {
    this.dialogRef.close(this.rulesForm.get('rules').value);
  }

}
