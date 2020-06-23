import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pane } from '@classifieds-ui/pages';
import { AttributeTypes } from '@classifieds-ui/attributes';
import { FilesService } from '../../services/files.service';
import { MediaFile } from '../../models/media.models';

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
    private filesService: FilesService
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
    this.filesService.bulkUpload([this.media]).subscribe((mediaFiles) => {
      if(this.data.paneIndex === undefined) {
        (this.data.panelFormGroup.get('panes') as FormArray).push(this.fb.group({
          contentPlugin: 'media',
          settings: new FormArray(this.buildSettings(mediaFiles[0]))
        }));
      } else {
        /*const paneForm = (this.data.panelFormGroup.get('panes') as FormArray).at(this.data.paneIndex);
        (paneForm.get('settings') as FormArray).clear();
        this.buildSettings(snippet).forEach(s => {
          (paneForm.get('settings') as FormArray).push(s)
        });*/
      }
      this.dialogRef.close();
    });
  }

  onRemoveMedia(event) {
    this.media = undefined;
  }

  buildSettings(mediaFile: MediaFile): Array<FormGroup> {
    return [
      this.fb.group({
        name: new FormControl('id', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('Id', Validators.required),
        value: new FormControl(mediaFile.id, Validators.required),
        computedValue: new FormControl(mediaFile.id, Validators.required),
      }),
      this.fb.group({
        name: new FormControl('length', Validators.required),
        type: new FormControl(AttributeTypes.Number, Validators.required),
        displayName: new FormControl('Length', Validators.required),
        value: new FormControl(mediaFile.length, Validators.required),
        computedValue: new FormControl(mediaFile.length, Validators.required),
      }),
      this.fb.group({
        name: new FormControl('contentDisposition', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('Content Disposition', Validators.required),
        value: new FormControl(mediaFile.contentDisposition, Validators.required),
        computedValue: new FormControl(mediaFile.contentDisposition, Validators.required),
      }),
      this.fb.group({
        name: new FormControl('path', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('Path', Validators.required),
        value: new FormControl(mediaFile.path, Validators.required),
        computedValue: new FormControl(mediaFile.path, Validators.required),
      }),
      this.fb.group({
        name: new FormControl('contentType', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('Content Type', Validators.required),
        value: new FormControl(mediaFile.contentType, Validators.required),
        computedValue: new FormControl(mediaFile.contentType, Validators.required),
      }),
      this.fb.group({
        name: new FormControl('fileName', Validators.required),
        type: new FormControl(AttributeTypes.Text, Validators.required),
        displayName: new FormControl('File Name', Validators.required),
        value: new FormControl(mediaFile.fileName, Validators.required),
        computedValue: new FormControl(mediaFile.fileName, Validators.required),
      })
    ];
  }

}
