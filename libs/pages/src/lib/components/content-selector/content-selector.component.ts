import { Component, OnInit, Inject } from '@angular/core';
import { CONTENT_PROVIDER, ContentProvider } from '@classifieds-ui/content';

@Component({
  selector: 'classifieds-ui-content-selector',
  templateUrl: './content-selector.component.html',
  styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

  selectedIndex = 0
  provider: ContentProvider;

  contentProviders: Array<ContentProvider> = [];

  constructor(@Inject(CONTENT_PROVIDER) contentProviders: Array<ContentProvider>) {
    this.contentProviders = contentProviders;
  }

  ngOnInit(): void {
  }

  onEntitySelected(provider: ContentProvider) {
    this.provider = provider;
    this.selectedIndex = 1;
  }

}
