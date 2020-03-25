import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import * as uuid from 'uuid';

@Injectable()
export class CorrelationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if(req.url.indexOf('cloudinary') === -1 && req.url.indexOf('carquery') === -1) {
      const newReq = req.clone({
        headers: req.headers.set('X-Correlation-ID', uuid.v4())
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }

  }
}
