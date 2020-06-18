import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[classifiedsUiPanelContentHost]'
})
export class PanelContentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
