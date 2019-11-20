import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { MEDIA_SETTINGS } from '../media.tokens';
import { MediaSettings, MediaFile } from '../models/media.models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(@Inject(MEDIA_SETTINGS) private settings: MediaSettings, private http: HttpClient) {}
  bulkUpload(files: Array<File>): Observable<Array<Observable<MediaFile>>> {
    const requests$ = [];
    files.forEach(f => {
      const formData = new FormData();
      formData.append('File', f, f.name);
      requests$.push(this.http.post(`${this.settings.endpointUrl}/files`, formData));
    });
    return forkJoin(requests$);
  }
}
