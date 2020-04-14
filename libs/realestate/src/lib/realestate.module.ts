import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaModule } from '@classifieds-ui/media';
import { AttributesModule } from '@classifieds-ui/attributes';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MediaModule, NgxGalleryModule, FlexLayoutModule, AttributesModule ]
})
export class RealestateModule {}
