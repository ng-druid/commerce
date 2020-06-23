import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@classifieds-ui/material';
import { CONTENT_PLUGIN } from '@classifieds-ui/content';
import { AttributesBuilderComponent } from './components/attributes-builder/attributes-builder.component';
import { AttributeWidgetComponent } from './components/attribute-widget/attribute-widget.component';
import { AttributeWidgetDirective } from './directives/attribute-widget.directive';
import { TextWidgetComponent } from './components/text-widget/text-widget.component';
import { AttributeWidget } from './models/attributes.models';
import { ATTRIBUTE_WIDGET } from './attribute.tokens';
import { MinMaxWidgetComponent } from './components/min-max-widget/min-max-widget.component';
import { AttributePipe } from './pipes/attribute.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [AttributesBuilderComponent, AttributeWidgetComponent, AttributeWidgetDirective, TextWidgetComponent, MinMaxWidgetComponent, AttributePipe],
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
    }
  ]
})
export class AttributesModule {}
