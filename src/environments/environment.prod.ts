import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://sso.wwseguros.com.do:8443/auth/',
  realm: 'worldwide',
  clientId: 'cotizador',
};

export const environment = {
  production: true,
  baseUrl: 'https://wwsdevfrontend.azurewebsites.net/',
  keycloak: keycloakConfig,
  apiUrl:'https://wwsdevportalbackend.azurewebsites.net'

};

