import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealestateAdListItemComponent } from './components/realestate-ad-list-item/realestate-ad-list-item.component';

// Workaround to prevent circular dependency.
import { AdTypePlugin } from '../../../ads/src/lib/models/ads.models';
import { AD_TYPE_PLUGIN } from '../../../ads/src/lib/ad.tokens';

@NgModule({
  imports: [CommonModule],
  declarations: [RealestateAdListItemComponent],
  providers: [
    { provide: AD_TYPE_PLUGIN, useValue: new AdTypePlugin({ adTypeId: 1, listItemDisplay: RealestateAdListItemComponent }), multi: true }
  ]
})
export class RealestateModule {}
