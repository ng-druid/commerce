import { Injectable } from '@angular/core';
import { ContentHandler } from '@classifieds-ui/content';
import { AttributeValue, AttributeTypes } from '@classifieds-ui/attributes';
import { FilesService } from '../services/files.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaFile } from '../models/media.models';

@Injectable()
export class MediaContentHandler implements ContentHandler {

  types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

  constructor(private filesService: FilesService) { }

  handleFile(file: File): Observable<Array<AttributeValue>> {
    return this.filesService.bulkUpload([file]).pipe(
      map(files => this.buildSettings(files[0]))
    );
  }

  handlesType(type: string): boolean {
    return this.types.find(t => t === type) !== undefined;
  }

  buildSettings(mediaFile: MediaFile): Array<AttributeValue> {
    return [
      new AttributeValue({
        name: 'id',
        type: AttributeTypes.Text,
        displayName: 'Id',
        value: mediaFile.id,
        computedValue: mediaFile.id,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'length',
        type: AttributeTypes.Number,
        displayName: 'Length',
        value: `${mediaFile.length}`,
        computedValue: `${mediaFile.length}`,
        intValue: mediaFile.length,
        attributes: []
      }),
      new AttributeValue({
        name: 'contentDisposition',
        type: AttributeTypes.Text,
        displayName: 'Content Disposition',
        value: mediaFile.contentDisposition,
        computedValue: mediaFile.contentDisposition,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'path',
        type: AttributeTypes.Text,
        displayName: 'Path',
        value: mediaFile.path,
        computedValue: mediaFile.path,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'contentType',
        type: AttributeTypes.Text,
        displayName: 'Content Type',
        value: mediaFile.contentType,
        computedValue: mediaFile.contentType,
        intValue: 0,
        attributes: []
      }),
      new AttributeValue({
        name: 'fileName',
        type: AttributeTypes.Text,
        displayName: 'File Name',
        value: mediaFile.fileName,
        computedValue: mediaFile.fileName,
        intValue: 0,
        attributes: []
      })
    ];
  }

}
