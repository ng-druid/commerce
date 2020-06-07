import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { FormlyModule } from '@ngx-formly/core';
// import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from '@classifieds-ui/material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityDefinitionService } from '@ngrx/data';
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
import { ProfileResolver } from './resolvers/profile.resolver';
import { CreateProfileGuard } from './guards/create-profile.guard';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

const routes = [
  { path: 'profile/:profileId', component: ProfileBrowserComponent, resolve: { profile: ProfileResolver }, children: [
    { path: 'create-profile', component: CreateProfileComponent, canActivate: [ CreateProfileGuard ] },
    { path: '', component: CreateProfileComponent }
  ] },
  { path: 'create-profile', component: CreateProfileComponent, canActivate: [ CreateProfileGuard ] }
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
  declarations: [CreateProfileComponent, ProfileMasterComponent, LocationMasterComponent, ProfileBrowserComponent, ProfileDashboardComponent, ProfileFormComponent],
  providers: [
    ProfileResolver,
    CreateProfileGuard
  ]
})
export class ProfilesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
