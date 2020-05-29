import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdBrowserFacade } from '../features/ad-browser/ad-browser.facade';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { AdType } from '../models/ads.models';
import { map } from 'rxjs/operators';

@Injectable()
export class AdTypeResolver implements Resolve<AdType> {
  private adTypesService: EntityCollectionService<AdType>;
  constructor(private adBrowserFacade: AdBrowserFacade, private es: EntityServices) {
    this.adTypesService = es.getEntityCollectionService('AdType')
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<AdType> {
    const adType = route.paramMap.get('adType');
    this.adBrowserFacade.setAdType(adType);
    return new Promise(res => {
      this.adTypesService.getAll().pipe(
        map(types => types.find(t => t.name === adType))
      ).subscribe(adType => {
        res(adType);
      })
    });
  }
}
