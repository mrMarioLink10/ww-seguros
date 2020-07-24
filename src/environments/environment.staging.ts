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
  baseUrl: 'https://wwsdevportalbackend-desadevportalbackend.azurewebsites.net/',
  keycloak: keycloakConfig,
  apiUrl: 'https://wwsdevportalbackend-desadevportalbackend.azurewebsites.net',
  keycloakConfig
};
