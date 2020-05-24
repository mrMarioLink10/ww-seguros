import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://sso.wwseguros.com.do:8443/auth/',
  realm: 'worldwide',
  clientId: 'cotizador',
};

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/',
  keycloak: keycloakConfig,
  apiUrl:'https://wwsdevportalbackend.azurewebsites.net'
};

export const FormValidationsConstant = {
  maxMenAge: 50,
MaleSexCode: "M",
linkCotizadores: "https://cotizadores.wwseguros.com.do/?cia=",
titlesForMajorExpenses: [
  'Solicitante',
  'Persona políticamente expuesta',
  'Perfil Financiero', 'Dependientes',
  'Sección A', 'Sección B',
  'Sección C Beneficiarios Primarios',
  'Beneficiario(s) Contingente(s)',
  'Comentarios adicionales'],
  titlesForMajorExpensesComplete: [
    'Solicitante',
    'Persona políticamente expuesta','Contratante',
    'Perfil Financiero', 'Dependientes',
    'Sección A', 'Sección B',
    'Sección C Beneficiarios Primarios',
    'Beneficiario(s) Contingente(s)',
    'Comentarios adicionales']
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
