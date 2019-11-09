import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, AdsFacade } from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-classifieds',
  templateUrl: './classifieds.component.html',
  styleUrls: ['./classifieds.component.scss']
})
export class ClassifiedsComponent implements OnInit {

  ads$: Observable<Array<Ad>>;
  constructor(private adsFacade: AdsFacade) { }

  ngOnInit() {
    this.ads$ = this.adsFacade.allAds$;
    this.adsFacade.loadAll();
  }

}
