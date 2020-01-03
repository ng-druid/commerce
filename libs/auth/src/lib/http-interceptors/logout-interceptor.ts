import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthFacade } from '../+state/auth.facade';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      tap({
        error: (e: HttpErrorResponse) => {
          if(e.status === 401) {
            this.authFacade.logout();
          }
        }
      })
    );

  }
}
