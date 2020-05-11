import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { FormlyModule } from '@ngx-formly/core';
// import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from '@classifieds-ui/material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { entityMetadata } from './entity-metadata';
import { ProfileMasterComponent } from './components/profile-master/profile-master.component';
import { LocationMasterComponent } from './components/location-master/location-master.component';
import { ProfileBrowserComponent } from './components/profile-browser/profile-browser.component';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import { StoreModule } from '@ngrx/store';
import * as fromProfileBrowser from './features/profile-browser/profile-browser.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileBrowserEffects } from './features/profile-browser/profile-browser.effects';
import { ProfilesDataService } from './services/profiles-data.service';
import { ProfileResolver } from './resolvers/profile.resolver';

const routes = [
  { path: '', component: ProfileBrowserComponent, children: [
    { path: 'profile/:profileId', component: ProfileDashboardComponent, resolve: { profile: ProfileResolver } },
    { path: 'create-profile', component: CreateProfileComponent },
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromProfileBrowser.profileBrowserFeatureKey, fromProfileBrowser.reducer),
    EffectsModule.forFeature([ProfileBrowserEffects]),
    /*FormlyModule.forChild(),
    FormlyMaterialModule*/
  ],
  declarations: [CreateProfileComponent, ProfileMasterComponent, LocationMasterComponent, ProfileBrowserComponent, ProfileDashboardComponent],
  providers: [
    ProfileResolver
  ]
})
export class ProfilesModule {
  constructor(eds: EntityDefinitionService, entityDataService: EntityDataService, profilesDataService: ProfilesDataService) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerServices({
      Profile: profilesDataService
    });
  }
}
