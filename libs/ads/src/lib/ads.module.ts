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
import { UtilsModule } from '@classifieds-ui/utils';
import { RealestateModule } from '@classifieds-ui/realestate';
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
import { AdsDataService } from './services/ads-data.service';
import { AdListItemsDataService } from './services/ad-list-items-data.service';
import { AdProfileItemsDataService } from './services/ad-profile-items-data.service';
import { FeatureListItemsDataService } from './services/feature-list-items-data.service';
import { AdTypesDataService } from './services/ad-types-data.service';
import { AdListItemComponent } from './components/ad-list-item/ad-list-item.component';
import { AdTypePluginDirective } from './directives/ad-type-plugin.directive';
import { AdListItemDefaultComponent } from './components/ad-list-item-default/ad-list-item-default.component';
import { AdFormComponent } from './components/ad-form/ad-form.component';
import { ManageAdComponent } from './components/manage-ad/manage-ad.component';

const routes = [
  { path: ':adType', component: AdBrowserComponent, resolve: { adType: AdTypeResolver }, children: [
    { path: 'ad/:adId/manage', component: ManageAdComponent },
    { path: 'ad/:adId', component: AdDetailComponent },
    { path: 'create-ad', component: CreateAdComponent, canActivate: [CreateAdGuard] },
  ] }
];

@NgModule({
  declarations: [AdDetailComponent, CreateAdComponent, AdMasterComponent, AdSearchBarComponent, AdBrowserComponent, AdDetailTabComponent, AdGalleryTabComponent, AdFeaturesFilterComponent, AdAttributesFilterComponent, AdListItemComponent, AdTypePluginDirective, AdListItemDefaultComponent, AdFormComponent, ManageAdComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgxGalleryModule,
    NgxDropzoneModule,
    UtilsModule,
    TaxonomyModule,
    CitiesModule,
    AttributesModule,
    RealestateModule,
    AutosModule,
    StoreModule.forFeature(fromAdBrowser.adBrowserFeatureKey, fromAdBrowser.reducer),
    EffectsModule.forFeature([AdBrowserEffects])
  ],
  providers: [
    CreateAdGuard,
    AdTypeResolver
  ],
  entryComponents: [AdListItemDefaultComponent]
})
export class AdsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    adsDataService: AdsDataService,
    adListItemsDataService: AdListItemsDataService,
    featureListItemsDataService: FeatureListItemsDataService,
    adTypesDataService: AdTypesDataService,
    adProfileItemsDataService: AdProfileItemsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerServices({
      Ad: adsDataService,
      AdListItem: adListItemsDataService,
      FeatureListItem: featureListItemsDataService,
      AdType: adTypesDataService,
      AdProfileItem: adProfileItemsDataService
    });
    /*entityDataService.registerService('Ad', this.createAdsDataService<Ad>('Ad', http, httpUrlGenerator, config));
    entityDataService.registerService('AdListItem', this.createAdsDataService<AdListItem>('AdListItem', http, httpUrlGenerator, config));
    entityDataService.registerService('FeatureListItem', this.createAdsDataService<FeatureListItem>('FeatureListItem', http, httpUrlGenerator, config));
    entityDataService.registerService('AdType', this.createAdsDataService<AdType>('AdType', http, httpUrlGenerator, config));*/
  }
  // This is not my favorite way to do this but it works without needing to create a separate data service class for each entity.
  /*createAdsDataService<T>(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config: DefaultDataServiceConfig
  ): EntityCollectionDataService<T> {
    const configCopy = { ...config, root: `${config.root}/ads` } as DefaultDataServiceConfig;
    return new DefaultDataService<T>(
      entityName,
      http,
      httpUrlGenerator,
      configCopy
    );
  }*/
}
