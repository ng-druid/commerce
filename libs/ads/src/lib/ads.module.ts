import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAds from './+state/ads.reducer';
import { AdsEffects } from './+state/ads.effects';
import { AdsFacade } from './+state/ads.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAds.ADS_FEATURE_KEY, fromAds.reducer),
    EffectsModule.forFeature([AdsEffects])
  ],
  providers: [AdsFacade]
})
export class AdsModule {}
