import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://sso.wwseguros.com.do:8443/auth',
  realm: 'worldwide',
  clientId: 'cotizador',
};

export const environment = {
  production: false,
  instructivo: "http://wwsdevportalbackend-desadevportalbackend.azurewebsites.net/INSTRUCTIVO_V2.pdf",
  fileUrl: 'http://wwsdevportalbackend-desadevportalbackend.azurewebsites.net',
  mailForHelp: "ayuda_wws@wws.com.do",
  mailForHelpPM: "ayuda_wwma@wwmedicalassurance.com",
  urlCotizadores: "http://portalwwg.eastus.cloudapp.azure.com:3000",
  urlCotizadoresPdf: "http://portalwwg.eastus.cloudapp.azure.com:3031",
  urlCotizadoresBoth: "http://portalwwg.eastus.cloudapp.azure.com:3000/?cia=",
  urlCotizadoresVida: "http://portalwwg.eastus.cloudapp.azure.com:3000/vida",
  urlCotizadoresSalud: "http://portalwwg.eastus.cloudapp.azure.com:3000/salud",
  baseUrl: 'https://wwsdevfrontend-desadevfrontend.azurewebsites.net/',
  keycloak: keycloakConfig,
  apiUrl: 'https://wwsdevportalbackend.azurewebsites.net/',
  urlNotAccess: 'https://wwsdevportalbackend-desadevportalbackend.azurewebsites.net/AccesoPortal/index/?location=',
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
