import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdBrowserFacade } from '../features/ad-browser/ad-browser.facade';

@Injectable()
export class CreateAdGuard implements CanActivate {
  constructor(private adBrowserFacde: AdBrowserFacade, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if(state.url === '/ads/nop/create-ad') {
      return new Promise(res => {
        this.adBrowserFacde.getAdType$.subscribe(adType => {
          res(false);
          this.router.navigateByUrl(`/ads/${adType ? adType : 'general'}/create-ad`);
        })
      });
    } else {
      return new Promise(res => res(true));
    }
  }
}
