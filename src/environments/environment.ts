import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://sso.wwseguros.com.do:8443/auth',
  realm: 'worldwide',
  clientId: 'cotizador',
};

export const environment = {
  production: false,
  fileUrl: 'http://wwsdevportalbackend-desadevportalbackend.azurewebsites.net',
  mailForHelp: "ayuda_wws@wws.com.do",
  mailForHelpPM: "ayuda_wwma@wwmedicalassurance.com",
  urlCotizadores: "http://portalwwg.eastus.cloudapp.azure.com:3000",
  urlCotizadoresBoth: "http://portalwwg.eastus.cloudapp.azure.com:3000/?cia=",
  urlCotizadoresVida: "http://portalwwg.eastus.cloudapp.azure.com:3000/vida",
  urlCotizadoresSalud: "http://portalwwg.eastus.cloudapp.azure.com:3000/salud",
  baseUrl: 'https://wwsdevfrontend-desadevfrontend.azurewebsites.net/',
  keycloak: keycloakConfig,
  apiUrl: 'https://wwsdevportalbackend-desadevportalbackend.azurewebsites.net',
  keycloakConfig
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
