import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://wwskeycloak.eastus.cloudapp.azure.com:8080/auth',
  realm: 'worldwide',
  clientId: 'cotizador',
};

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/',
  keycloak: keycloakConfig,
  apiUrl: 'https://wwsdevportalbackend.azurewebsites.net'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
