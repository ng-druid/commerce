import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ADS_SETTINGS } from '../ads.tokens';
import { Ad, AdsSettings } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(@Inject(ADS_SETTINGS) private settings: AdsSettings, private http: HttpClient) { }
  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.settings.endpointUrl}/ads`);
  }
  createAd(ad: Ad) {
    return this.http.post(`${this.settings.endpointUrl}/ads`, ad);
  }
  getAd(id: string): Observable<Ad> {
    return this.http.get<Ad>(`${this.settings.endpointUrl}/ads/${id}`);
  }
}
