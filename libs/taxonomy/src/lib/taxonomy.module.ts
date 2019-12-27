import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@classifieds-ui/material';
import { TaxonomySelectorComponent } from './components/taxonomy-selector/taxonomy-selector.component';

@NgModule({
  imports: [CommonModule, MaterialModule, HttpClientModule, FormsModule],
  declarations: [TaxonomySelectorComponent],
  exports: [TaxonomySelectorComponent]
})
export class TaxonomyModule {}