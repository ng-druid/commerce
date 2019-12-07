import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, forkJoin, NEVER, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MEDIA_SETTINGS } from '../media.tokens';
import { MediaSettings, MediaFile } from '../models/media.models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(@Inject(MEDIA_SETTINGS) private settings: MediaSettings, private http: HttpClient) {}
  bulkUpload(files: Array<File>): Observable<Array<MediaFile>> {
    const requests$ = [];
    files.forEach(f => {
      const formData = new FormData();
      formData.append('File', f, f.name);
      requests$.push(this.http.post(`${this.settings.endpointUrl}/files`, formData).pipe(
        catchError(e => {
          console.log(e);
          return NEVER;
        })
      ));
    });
    return requests$.length > 0 ? forkJoin(requests$) : of([]);
  }
}
