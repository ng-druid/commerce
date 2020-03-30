import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MEDIA_SETTINGS } from '../media.tokens';
import { MediaSettings, MediaFile, CloudinaryUploadResponse } from '../models/media.models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(@Inject(MEDIA_SETTINGS) private settings: MediaSettings, private http: HttpClient) {}
  bulkUpload(files: Array<File>): Observable<Array<MediaFile>> {
    const requests$: Array<Observable<MediaFile>> = [];
    files.forEach(f => {
      const formData = new FormData();
      formData.append('file', f, f.name);
      formData.append('upload_preset', this.settings.uploadPreset);
      requests$.push(this.http.post(`${this.settings.cloudinaryUrl}/upload`, formData).pipe(
        catchError(e => {
          return throwError(new Error("Error uploading images."));
        }),
        map((data) => {
          const res = new CloudinaryUploadResponse(data as CloudinaryUploadResponse);
          return new MediaFile({
            id: res.public_id,
            contentType: res.format,
            contentDisposition: '',
            path: `${res.public_id}.${res.format}`,
            length: res.bytes,
            fileName: res.original_filename
           });
        }),
      ));
    });
    return requests$.length > 0 ? forkJoin(requests$) : of([]);
  }
}
