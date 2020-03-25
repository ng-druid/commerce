import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdBrowserFacade } from '../features/ad-browser/ad-browser.facade';

@Injectable()
export class AdTypeResolver implements Resolve<string> {
  constructor(private adBrowserFacade: AdBrowserFacade) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<string> {
    const adType = route.paramMap.get('adType');
    this.adBrowserFacade.setAdType(adType);
    return new Promise(res => res(adType));
  }
}
