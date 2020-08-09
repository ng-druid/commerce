import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InlineContext } from '../../models/context.models';

@Component({
  selector: 'classifieds-ui-context-dialog',
  templateUrl: './context-dialog.component.html',
  styleUrls: ['./context-dialog.component.scss']
})
export class ContextDialogComponent implements OnInit {

  contextForm = this.fb.group({
    context: this.fb.control('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { },
    private dialogRef: MatDialogRef<ContextDialogComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.contextForm.get('context').value.name !== '') {
      this.dialogRef.close(new InlineContext(this.contextForm.get('context').value));
    } else {
      this.dialogRef.close();
    }
  }

}
