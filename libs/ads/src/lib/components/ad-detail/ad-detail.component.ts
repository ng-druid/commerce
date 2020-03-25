import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { iif, of, EMPTY } from 'rxjs';
import { map, filter, switchMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { MEDIA_SETTINGS, MediaSettings } from '@classifieds-ui/media';
import { CitiesService, City } from '@classifieds-ui/cities';

import { Ad } from '../../models/ads.models';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
  ad: Ad;
  city: string;
  displayOverlay = true;
  displayGalleryTab = false;
  mediaBaseUrl: string;
  selectedTabIndex = 0;
  adType: string;
  constructor(@Inject(MEDIA_SETTINGS) private mediaSettings: MediaSettings, private mo: MediaObserver, private route: ActivatedRoute, private adsService: AdsService, private citiesService: CitiesService) { }
  ngOnInit() {
    this.mediaBaseUrl = this.mediaSettings.imageUrl;
    this.route.paramMap.pipe(
      map(p => [p.get('adId'), p.get('adType')]),
      filter(([adId]) => typeof(adId) === 'string'),
      tap(() => this.displayOverlay = true),
      switchMap(([adId, adType]) => this.adsService.getByKey(adId).pipe(
        map<Ad, [Ad, string]>(ad => [ad, adType])
      )), /*.pipe(
        switchMap(ad =>
          ad.location && ad.location.length === 2 ?
          this.citiesService.getWithQuery({ lat: `${ad.location[1]}`, lng: `${ad.location[0]}`}).pipe(
            map(cities => cities.length > 0 ? cities[0] : undefined),
            map(city => [ad, city])
          ) : of([ad])
        )
      )*/
    ).subscribe(([ad, adType]) => {
      this.adType = adType;
      this.displayOverlay = false;
      this.selectedTabIndex = 0;
      this.ad = new Ad(ad as Ad);
      this.city = ad.cityDisplay;
    });
    // this.displayGalleryTab = true;
    this.mo.asObservable().pipe(
      map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)
    ).subscribe(desktop => {
      this.displayGalleryTab = !desktop;
    });
  }
}
