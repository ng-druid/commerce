import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ad, AdDetail, AdsFacade, SearchConfig } from '@classifieds-ui/ads';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-ad-browser',
  templateUrl: './ad-browser.component.html',
  styleUrls: ['./ad-browser.component.scss']
})
export class AdBrowserComponent implements OnInit {
  ad: AdDetail;
  ads: Ad[];
  constructor(private route: ActivatedRoute, private adsFacade: AdsFacade) { }
  ngOnInit() {
    this.adsFacade.detail$.subscribe(ad => this.ad = ad);
    this.adsFacade.allAds$.subscribe(ads => this.ads = ads);
    this.adsFacade.loadAll();
    this.route.paramMap.pipe(
      map(p => p.get('adId')),
      filter(adId => typeof(adId) === 'string')
    ).subscribe((adId: string) => {
      this.adsFacade.loadAd(adId);
    });
  }
  onSearchChange(searchString: string) {
    this.adsFacade.loadAll(new SearchConfig({ searchString }));
  }
}
