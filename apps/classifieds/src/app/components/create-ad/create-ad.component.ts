import { Component } from '@angular/core';
import { AdDetail, AdsService } from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {

  ad: AdDetail = new AdDetail();

  constructor(private adsService: AdsService) { }

  onSubmit() {
    console.log('create ad');
    this.adsService.createAd(this.ad).subscribe();
  }

}
