import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { MaterialModule } from '@classifieds-ui/material';
import { TaxonomyModule } from '@classifieds-ui/taxonomy';
import { AttributesModule } from '@classifieds-ui/attributes';
import { CitiesModule } from '@classifieds-ui/cities';
import { AutosModule } from '@classifieds-ui/autos';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


import { AdBrowserComponent } from './components/ad-browser/ad-browser.component';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { AdMasterComponent } from './components/ad-master/ad-master.component';
import { AdSearchBarComponent } from './components/ad-search-bar/ad-search-bar.component';
import { AdDetailTabComponent } from './components/ad-detail/ad-detail-tab/ad-detail-tab.component';
import { AdGalleryTabComponent } from './components/ad-detail/ad-gallery-tab/ad-gallery-tab.component';
import { entityMetadata } from './entity-metadata';
import { AdFeaturesFilterComponent } from './components/ad-features-filter/ad-features-filter.component';
import { StoreModule } from '@ngrx/store';
import * as fromAdBrowser from './features/ad-browser/ad-browser.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdBrowserEffects } from './features/ad-browser/ad-browser.effects';
import { CreateAdGuard } from './guards/create-ad.guard';
import { AdTypeResolver } from './resolvers/ad-type.resolver';
import { AdAttributesFilterComponent } from './components/ad-attributes-filter/ad-attributes-filter.component';

const routes = [
  { path: ':adType', component: AdBrowserComponent, resolve: { adType: AdTypeResolver }, children: [
    { path: 'ad/:adId', component: AdDetailComponent },
    { path: 'create-ad', component: CreateAdComponent, canActivate: [CreateAdGuard] },
  ] }
];

@NgModule({
  declarations: [AdDetailComponent, CreateAdComponent, AdMasterComponent, AdSearchBarComponent, AdBrowserComponent, AdDetailTabComponent, AdGalleryTabComponent, AdFeaturesFilterComponent, AdAttributesFilterComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgxGalleryModule,
    NgxDropzoneModule,
    TaxonomyModule,
    CitiesModule,
    AttributesModule,
    AutosModule,
    StoreModule.forFeature(fromAdBrowser.adBrowserFeatureKey, fromAdBrowser.reducer),
    EffectsModule.forFeature([AdBrowserEffects])
  ],
  providers: [
    CreateAdGuard,
    AdTypeResolver
  ]
})
export class AdsModule {
  constructor(eds: EntityDefinitionService, entityDataService: EntityDataService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
