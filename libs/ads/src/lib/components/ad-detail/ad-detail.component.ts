import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { MEDIA_SETTINGS, MediaSettings } from '@classifieds-ui/media';

import { Ad } from '../../models/ads.models';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
  ad: Ad;
  displayOverlay = true;
  displayGalleryTab = false;
  mediaBaseUrl: string;
  selectedTabIndex = 0;
  constructor(@Inject(MEDIA_SETTINGS) private mediaSettings: MediaSettings, private mo: MediaObserver, private route: ActivatedRoute, private adsService: AdsService) { }
  ngOnInit() {
    this.mediaBaseUrl = this.mediaSettings.endpointUrl;
    this.route.paramMap.pipe(
      map(p => p.get('adId')),
      filter(adId => typeof(adId) === 'string'),
      tap(() => this.displayOverlay = true),
      switchMap(adId => this.adsService.getByKey(adId)),
    ).subscribe((ad: Ad) => {
      this.displayOverlay = false;
      this.selectedTabIndex = 0;
      this.ad = new Ad(ad);
    });
    this.mo.asObservable().pipe(
      map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)
    ).subscribe(desktop => {
      this.displayGalleryTab = !desktop;
    });
  }
}
