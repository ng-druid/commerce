import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { MEDIA_SETTINGS, MediaSettings } from '@classifieds-ui/media';

import { AdDetail } from '../../models/ads.models';
import { AdsFacade } from '../../+state/ads.facade';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
  ad: AdDetail;
  displayOverlay = true;
  mediaBaseUrl: string;
  selectedTabIndex = 0;
  constructor(@Inject(MEDIA_SETTINGS) private mediaSettings: MediaSettings, private route: ActivatedRoute, private adsFacade: AdsFacade) { }
  ngOnInit() {
    this.mediaBaseUrl = this.mediaSettings.endpointUrl;
    this.adsFacade.detail$.subscribe(ad => {
      this.selectedTabIndex = 0;
      this.displayOverlay = false;
      this.ad = ad
    });
    this.route.paramMap.pipe(
      map(p => p.get('adId')),
      filter(adId => typeof(adId) === 'string')
    ).subscribe((adId: string) => {
      this.displayOverlay = true;
      this.adsFacade.loadAd(adId);
    });
  }
  chat() {

  }
}
