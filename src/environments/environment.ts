// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: 'http://localhost:3000/',
  firebaseConfig: {
    apiKey: "AIzaSyD4ky_KTguAuZdwuLfThtfUqZCWlr2v3hQ",
    authDomain: "origami-a7cca.firebaseapp.com",
    projectId: "origami-a7cca",
    storageBucket: "origami-a7cca.appspot.com",
    messagingSenderId: "991391722902",
    appId: "1:991391722902:web:d016f673f1e954d3ac01b7"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
