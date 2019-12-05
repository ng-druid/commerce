import { Component, Input, OnInit } from '@angular/core';
import { AdDetail } from '@classifieds-ui/ads';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
  @Input()
  ad: AdDetail;
  mediaBaseUrl: string;
  ngOnInit() {
    this.mediaBaseUrl = environment.mediaSettings.endpointUrl;
  }
}
