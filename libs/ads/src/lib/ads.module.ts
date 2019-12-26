import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@classifieds-ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from 'ngx-dropzone';

import * as fromAds from './+state/ads.reducer';
import { AdsEffects } from './+state/ads.effects';
import { AdsFacade } from './+state/ads.facade';
import { AdBrowserComponent } from './components/ad-browser/ad-browser.component';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { AdMasterComponent } from './components/ad-master/ad-master.component';
import { AdSearchBarComponent } from './components/ad-search-bar/ad-search-bar.component';
import { AdDetailTabComponent } from './components/ad-detail/ad-detail-tab/ad-detail-tab.component';
import { AdGalleryTabComponent } from './components/ad-detail/ad-gallery-tab/ad-gallery-tab.component';
import { AdFeaturesTabComponent } from './components/ad-detail/ad-features-tab/ad-features-tab.component';
import { TaxonomyModule } from '@classifieds-ui/taxonomy';

const routes = [
  { path: '', component: AdBrowserComponent, children: [
    { path: 'ad/:adId', component: AdDetailComponent },
    { path: 'create-ad', component: CreateAdComponent },
  ] }
];

@NgModule({
  declarations: [AdDetailComponent, CreateAdComponent, AdMasterComponent, AdSearchBarComponent, AdBrowserComponent, AdDetailTabComponent, AdGalleryTabComponent, AdFeaturesTabComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromAds.ADS_FEATURE_KEY, fromAds.reducer),
    EffectsModule.forFeature([AdsEffects]),
    MaterialModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    TaxonomyModule
  ],
  providers: [AdsFacade]
})
export class AdsModule {}
