import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthFacade } from '../+state/auth.facade';
import { Observable } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authFacade.token$.pipe(
      take(1),
      concatMap(t => {
        if (t && req.url.indexOf('cloudinary') === -1) {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', t)
          });
          return next.handle(authReq)
        } else {
          return next.handle(req);
        }
      })
    );

  }
}
