import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[classifiedsUiAdTypePluginHost]'
})
export class AdTypePluginDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
