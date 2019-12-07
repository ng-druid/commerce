import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdDetail, AdsFacade } from '@classifieds-ui/ads';
import { map, filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
  ad: AdDetail;
  displayOverlay = true;
  mediaBaseUrl: string;
  constructor(private route: ActivatedRoute, private adsFacade: AdsFacade) { }
  ngOnInit() {
    this.mediaBaseUrl = environment.mediaSettings.endpointUrl;
    this.adsFacade.detail$.subscribe(ad => {
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
}
