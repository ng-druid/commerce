import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[classifiedsUiAdDisplayHost]'
})
export class AdDisplayDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
