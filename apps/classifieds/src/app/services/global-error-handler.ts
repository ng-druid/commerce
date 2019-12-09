import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LogService } from '@classifieds-ui/logging';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
constructor(private logService: LogService, private localStrategy: LocationStrategy) { }
handleError(error) {
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(sf => sf.toString())
        .join('\n');
        this.logService.log({ message, url, stack: stackString });
    });
    throw error;
  }
}
