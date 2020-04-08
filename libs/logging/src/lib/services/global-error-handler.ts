import { ErrorHandler, Injectable, Injector, PLATFORM_ID, Inject } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, Location, isPlatformBrowser } from '@angular/common';
import * as StackTrace from 'stacktrace-js';

import { LogService } from '../services/log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private logService: LogService, private localStrategy: LocationStrategy, private location: Location) { }
  handleError(error) {
    const message = error.message ? error.message : error.toString();
    const url = this.location.path();
    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(sf => sf.toString())
        .join('\n');
        this.logService.log({ message, url, stack: stackString });
    });
    // When error is thrown ss bombs entire app / server - not good :/
    if (this.isBrowser) {
      throw error;
    } else {
      console.log(error);
    }
  }
}
