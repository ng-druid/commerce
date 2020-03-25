import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@classifieds-ui/material';
import { AttributesBuilderComponent } from './components/attributes-builder/attributes-builder.component';
import { AttributeWidgetComponent } from './components/attribute-widget/attribute-widget.component';
import { AttributeWidgetDirective } from './directives/attribute-widget.directive';
import { TextWidgetComponent } from './components/text-widget/text-widget.component';
import { AttributeWidget } from './models/attributes.models';
import { ATTRIBUTE_WIDGET } from './attribute.tokens';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [AttributesBuilderComponent, AttributeWidgetComponent, AttributeWidgetDirective, TextWidgetComponent],
  exports: [AttributesBuilderComponent],
  entryComponents: [ TextWidgetComponent ],
  providers: [
    {
      provide: ATTRIBUTE_WIDGET,
      useValue: new AttributeWidget({ name: 'text', component: TextWidgetComponent }),
      multi: true
    }
  ]
})
export class AttributesModule {}
