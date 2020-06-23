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
import { AttributeEditorComponent } from './components/attribute-editor/attribute-editor.component';
import { AttributePaneRendererComponent } from './components/attribute-pane-renderer/attribute-pane-renderer.component';
import { AttributeContentHandler } from './handlers/attribute-content.handler';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [AttributesBuilderComponent, AttributeWidgetComponent, AttributeWidgetDirective, TextWidgetComponent, MinMaxWidgetComponent, AttributePipe, AttributeEditorComponent, AttributePaneRendererComponent],
  exports: [AttributesBuilderComponent, AttributePipe],
  entryComponents: [ TextWidgetComponent, MinMaxWidgetComponent ],
  providers: [
    {
      provide: AttributeContentHandler,
      useClass: AttributeContentHandler
    },
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
