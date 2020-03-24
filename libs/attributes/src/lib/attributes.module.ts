import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@classifieds-ui/material';
import { AttributesBuilderComponent } from './components/attributes-builder/attributes-builder.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [AttributesBuilderComponent],
  exports: [AttributesBuilderComponent]
})
export class AttributesModule {}
