// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adsSettings: {
    endpointUrl: 'https://localhost:44342'
  },
  mediaSettings: {
    endpointUrl: 'https://localhost:44328'
  },
  loggingSettings: {
    endpointUrl: "https://localhost:44375"
  },
  citiesSettings: {
    endpointUrl: "https://localhost:44369"
  },
  clientSettings: {
    authority: 'https://localhost:44392',
    client_id: 'classifieds_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    response_type:"id_token token",
    scope:"openid profile email ads_api media_api"
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
