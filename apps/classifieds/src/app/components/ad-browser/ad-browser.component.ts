import { Component } from '@angular/core';
import { AdsFacade } from '@classifieds-ui/ads';
import { AdSearchBarForm } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-ad-browser',
  templateUrl: './ad-browser.component.html',
  styleUrls: ['./ad-browser.component.scss']
})
export class AdBrowserComponent {
  searchForm: AdSearchBarForm;
  constructor(private adsFacade: AdsFacade) { }
  onFormSubmit(searchForm: AdSearchBarForm) {
    this.searchForm = searchForm;
  }
}
