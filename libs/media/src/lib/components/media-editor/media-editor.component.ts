import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pane } from '@classifieds-ui/pages';
import { AttributeTypes } from '@classifieds-ui/attributes';
import { FilesService } from '../../services/files.service';
import { MediaFile } from '../../models/media.models';
import { MediaContentHandler } from '../../handlers/media-content.handler';

@Component({
  selector: 'classifieds-ui-media-editor',
  templateUrl: './media-editor.component.html',
  styleUrls: ['./media-editor.component.scss']
})
export class MediaEditorComponent implements OnInit {

  media: File;

  mediaTypes = '.png,.jpg,.jpeg,.gif';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { panelFormGroup: FormGroup; pane: Pane; paneIndex: number;  },
    private dialogRef: MatDialogRef<MediaEditorComponent>,
    private fb: FormBuilder,
    private filesService: FilesService,
    private handler: MediaContentHandler
  ) { }

  ngOnInit(): void {
    if(this.data.pane !== undefined) {
      this.filesService.convertToFiles([new MediaFile({
        path: this.data.pane.settings.find(s => s.name === 'path').value,
        contentType: this.data.pane.settings.find(s => s.name === 'contentType').value,
        contentDisposition: this.data.pane.settings.find(s => s.name === 'contentDisposition').value,
        id: this.data.pane.settings.find(s => s.name === 'id').value,
        length: parseInt(this.data.pane.settings.find(s => s.name === 'length').value),
        fileName: this.data.pane.settings.find(s => s.name === 'fileName').value
      })]).subscribe(files => {
        this.media = files[0];
      });
    }
  }

  onSelectMedia(event) {
    this.media = event.addedFiles[0];
    this.handler.handleFile(this.media).subscribe(settings => {
      if(this.data.paneIndex === undefined) {
        (this.data.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
          contentPlugin: 'media',
          settings: new FormArray(settings.map(s => this.fb.group({
            name: new FormControl(s.name, Validators.required),
            type: new FormControl(s.type, Validators.required),
            displayName: new FormControl(s.displayName, Validators.required),
            value: new FormControl(s.value, Validators.required),
            computedValue: new FormControl(s.value, Validators.required),
          })))
        }));
      }
      this.dialogRef.close();
    });
  }

  onRemoveMedia(event) {
    this.media = undefined;
  }

}
