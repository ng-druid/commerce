import { Component, OnInit } from '@angular/core';
import { Ad, AdsFacade, SearchConfig } from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-ad-browser',
  templateUrl: './ad-browser.component.html',
  styleUrls: ['./ad-browser.component.scss']
})
export class AdBrowserComponent implements OnInit {
  ads: Ad[];
  displayMasterOverlay = true;
  constructor(private adsFacade: AdsFacade) { }
  ngOnInit() {
    this.adsFacade.allAds$.subscribe(ads => {
      this.displayMasterOverlay = false;
      this.ads = ads;
    });
    this.adsFacade.loadAll();
  }
  onSearchChange(searchString: string) {
    this.displayMasterOverlay = true;
    if(searchString === '') {
      this.adsFacade.loadAll();
    } else {
      this.adsFacade.loadAll(new SearchConfig({ searchString }));
    }
  }
}
