import { Component, OnInit, Input, Inject, TemplateRef, ContentChild } from '@angular/core';
import { MediaSettings, MEDIA_SETTINGS } from '@classifieds-ui/media';
import { INgxGalleryOptions, INgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AttributeMatcherService } from '@classifieds-ui/attributes';
import { AdListItem, AdType, AdTypePlugin } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-list-item',
  templateUrl: './ad-list-item.component.html',
  styleUrls: ['./ad-list-item.component.scss']
})
export class AdListItemComponent implements OnInit {

  @Input()
  ad: AdListItem;

  @Input()
  adType: AdType;

  @Input()
  plugin: AdTypePlugin;

  mediaBaseUrl: string;

  galleryOptions: Array<INgxGalleryOptions> = [
    {
      width: '100%',
      height: '100%',
      thumbnails: false,
      preview: false,
      imageAnimation: NgxGalleryAnimation.Slide
    }
  ];

  galleryImages: Array<INgxGalleryImage> = [];

  constructor(@Inject(MEDIA_SETTINGS) mediaSettings: MediaSettings, private attributesMatcher: AttributeMatcherService) {
    this.mediaBaseUrl = mediaSettings.imageUrl;
  }

  ngOnInit(): void {
    if(this.ad.images) {
      this.galleryImages = this.ad.images.map(i => ({
        small: `${this.mediaBaseUrl}/${i.path}`,
        medium: `${this.mediaBaseUrl}/${i.path}`,
        big: `${this.mediaBaseUrl}/${i.path}`
      }));
    }
  }

}
