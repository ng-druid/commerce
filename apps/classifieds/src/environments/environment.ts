// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adsSettings: {
    endpointUrl: 'https://localhost:44340/ads'
  },
  mediaSettings: {
    endpointUrl: 'https://localhost:44340/media'
  },
  loggingSettings: {
    endpointUrl: "https://localhost:44340/logging"
  },
  citiesSettings: {
    endpointUrl: "https://localhost:44340/cities"
  },
  chatSettings: {
    endpointUrl: "https://localhost:44340/chat"
  },
  taxonomySettings: {
    endpointUrl: "https://localhost:44340/taxonomy"
  },
  clientSettings: {
    authority: 'https://localhost:44392',
    client_id: 'classifieds_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    response_type: "code",
    scope:"openid profile ads_api media_api chat IdentityServerApi taxonomy_api api_gateway",
    filterProtocolClaims: true,
    loadUserInfo: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
