import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdDetail } from '@classifieds-ui/ads';
import { environment } from '../../../environments/environment';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit, OnChanges {
  @Input()
  ad: AdDetail;
  mediaBaseUrl: string;
  displayOverlay = true;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.mediaBaseUrl = environment.mediaSettings.endpointUrl;
    this.route.paramMap.pipe(
      map(p => p.get('adId')),
      filter(adId => typeof(adId) === 'string')
    ).subscribe((adId: string) => {
      this.displayOverlay = true;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.displayOverlay = false;
  }
}
