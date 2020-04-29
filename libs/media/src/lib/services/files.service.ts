import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MEDIA_SETTINGS } from '../media.tokens';
import { MediaSettings, MediaFile } from '../models/media.models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(@Inject(MEDIA_SETTINGS) private settings: MediaSettings, private http: HttpClient) {}
  bulkUpload(files: Array<File>): Observable<Array<MediaFile>> {
    const requests$: Array<Observable<MediaFile>> = [];
    files.forEach(f => {
      const formData = new FormData();
      formData.append('File', f, f.name);
      requests$.push(this.http.post<MediaFile>(`${this.settings.endpointUrl}/file`, formData).pipe(
        catchError(e => {
          return throwError(new Error("Error uploading images."));
        })
      ));
    });
    return requests$.length > 0 ? forkJoin(requests$) : of([]);
  }
}
