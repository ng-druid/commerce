import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@classifieds-ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxonomySelectorComponent } from './components/taxonomy-selector/taxonomy-selector.component';

@NgModule({
  imports: [CommonModule, MaterialModule, HttpClientModule, FormsModule, FlexLayoutModule ],
  declarations: [TaxonomySelectorComponent],
  exports: [TaxonomySelectorComponent]
})
export class TaxonomyModule {}
