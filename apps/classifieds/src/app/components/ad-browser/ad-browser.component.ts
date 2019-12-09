import { Component } from '@angular/core';
import { AdsFacade } from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-ad-browser',
  templateUrl: './ad-browser.component.html',
  styleUrls: ['./ad-browser.component.scss']
})
export class AdBrowserComponent {
  searchString;
  constructor(private adsFacade: AdsFacade) { }
  onSearchChange(searchString: string) {
    this.searchString = searchString;
  }
}
