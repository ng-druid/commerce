import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ADS_SETTINGS } from '../ads.tokens';
import { Ad, AdDetail, AdsSettings } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(@Inject(ADS_SETTINGS) private settings: AdsSettings, private http: HttpClient) { }
  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.settings.endpointUrl}/ads`).pipe(map(ads => ads.map(a => new Ad(a))));
  }
  createAd(ad: AdDetail) {
    return this.http.post(`${this.settings.endpointUrl}/ads`, ad);
  }
  getAd(id: string): Observable<AdDetail> {
    return this.http.get<AdDetail>(`${this.settings.endpointUrl}/ads/${id}`).pipe(map(ad => new AdDetail(ad)));
  }
}
