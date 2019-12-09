import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { LogService } from '../services/log.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(
        event => {
          if(event instanceof HttpErrorResponse) {
            // this.logService.log();
          }
        },
        error => {
          this.logService.log(error);
        })
    );
  }
}
