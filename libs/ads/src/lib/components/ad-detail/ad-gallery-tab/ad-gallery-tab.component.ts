import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { INgxGalleryOptions, INgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

import { AdDetail } from '../../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-gallery-tab',
  templateUrl: './ad-gallery-tab.component.html',
  styleUrls: ['./ad-gallery-tab.component.scss']
})
export class AdGalleryTabComponent implements OnChanges {

  @Input()
  ad: AdDetail;

  @Input()
  mediaBaseUrl: string;

  galleryOptions: Array<INgxGalleryOptions> = [
    {
      width: '100%',
      // height: '400px',
      thumbnailsColumns: 4,
      previewFullscreen: true,
      imageAnimation: NgxGalleryAnimation.Slide
    },
    // max-width 800
    /*{
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }*/
  ];
  galleryImages: Array<INgxGalleryImage> = [];

  ngOnChanges(changes: SimpleChanges) {
    if(changes.ad.previousValue !== changes.ad.currentValue) {
      this.galleryImages = this.ad.images.map(i => ({
        small: `${this.mediaBaseUrl}/${i.path}`,
        medium: `${this.mediaBaseUrl}/${i.path}`,
        big: `${this.mediaBaseUrl}/${i.path}`
      }));
    }
  }

}
