import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdDetail, AdsFacade } from '@classifieds-ui/ads';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {
  ad$: Observable<AdDetail>;

  constructor(private route: ActivatedRoute, private adsFacade: AdsFacade) { }

  ngOnInit() {
    this.ad$ = this.adsFacade.detail$;
    this.route.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.adsFacade.loadAd(params.get('adId'));
    });
  }

}
