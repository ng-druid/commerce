import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@classifieds-ui/material';
import { YmmSelectorComponent } from './components/ymm-selector/ymm-selector.component';
import { ATTRIBUTE_WIDGET, AttributeWidget } from '@classifieds-ui/attributes';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, HttpClientModule, HttpClientJsonpModule],
  declarations: [YmmSelectorComponent],
  exports: [YmmSelectorComponent],
  entryComponents: [YmmSelectorComponent],
  providers: [
    {
      provide: ATTRIBUTE_WIDGET,
      useValue: new AttributeWidget({ name: 'ymm_selector', component: YmmSelectorComponent }),
      multi: true
    }
  ]
})
export class AutosModule {}
