import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YmmSelectorComponent } from './components/ymm-selector/ymm-selector.component';
import { ATTRIBUTE_WIDGET, AttributeWidget } from '@classifieds-ui/attributes';

@NgModule({
  imports: [CommonModule],
  declarations: [YmmSelectorComponent],
  exports: [YmmSelectorComponent],
  providers: [
    {
      provide: ATTRIBUTE_WIDGET,
      useValue: new AttributeWidget({ name: 'ymm_selector', component: YmmSelectorComponent }),
      multi: true
    }
  ]
})
export class AutosModule {}
