import { Component, OnInit, Input, Inject } from '@angular/core';
import { MediaSettings, MEDIA_SETTINGS } from '@classifieds-ui/media';
import { INgxGalleryOptions, INgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AttributeMatcherService } from '@classifieds-ui/attributes';
import { AdListItem } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-list-item-default',
  templateUrl: './ad-list-item-default.component.html',
  styleUrls: ['./ad-list-item-default.component.scss']
})
export class AdListItemDefaultComponent implements OnInit {

  @Input()
  ad: AdListItem;

  @Input()
  adType: string;

  mediaBaseUrl: string;

  galleryOptions: Array<INgxGalleryOptions> = [
    {
      width: '100%',
      height: '100%',
      thumbnails: false,
      previewFullscreen: false,
      imageAnimation: NgxGalleryAnimation.Slide,
      previewForceFullscreen: false
    }
  ];

  galleryImages: Array<INgxGalleryImage> = [];

  constructor(@Inject(MEDIA_SETTINGS) mediaSettings: MediaSettings, private attributesMatcher: AttributeMatcherService) {
    this.mediaBaseUrl = mediaSettings.imageUrl;
  }

  ngOnInit(): void {
    if(this.ad.images) {
      this.galleryImages = this.ad.images.map(i => ({
        small: `${this.mediaBaseUrl}/image/upload/${i.path}`,
        medium: `${this.mediaBaseUrl}/image/upload/${i.path}`,
        big: `${this.mediaBaseUrl}/image/upload/${i.path}`
      }));
    }
  }

}

