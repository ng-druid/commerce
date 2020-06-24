import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@classifieds-ui/material';
import { AttributesBuilderComponent } from './components/attributes-builder/attributes-builder.component';
import { AttributeWidgetComponent } from './components/attribute-widget/attribute-widget.component';
import { AttributeWidgetDirective } from './directives/attribute-widget.directive';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { AttributeWidget } from './models/attributes.models';
import { ATTRIBUTE_WIDGET } from './attribute.tokens';
import { MinMaxWidgetComponent } from './widgets/min-max-widget/min-max-widget.component';
import { AttributePipe } from './pipes/attribute.pipe';
import { YmmSelectorComponent } from './widgets/ymm-selector/ymm-selector.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, HttpClientModule, HttpClientJsonpModule],
  declarations: [AttributesBuilderComponent, AttributeWidgetComponent, AttributeWidgetDirective, TextWidgetComponent, MinMaxWidgetComponent, AttributePipe, YmmSelectorComponent],
  exports: [AttributesBuilderComponent, AttributePipe],
  entryComponents: [ TextWidgetComponent, MinMaxWidgetComponent ],
  providers: [
    {
      provide: ATTRIBUTE_WIDGET,
      useValue: new AttributeWidget({ name: 'text', component: TextWidgetComponent }),
      multi: true
    },
    {
      provide: ATTRIBUTE_WIDGET,
      useValue: new AttributeWidget({ name: 'minmax', component: MinMaxWidgetComponent }),
      multi: true
    },
    {
      provide: ATTRIBUTE_WIDGET,
      useValue: new AttributeWidget({ name: 'ymm_selector', component: YmmSelectorComponent }),
      multi: true
    }
  ]
})
export class AttributesModule {}
