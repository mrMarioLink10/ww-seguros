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
  apiUrl: 'https://wwsdevportalbackend.azurewebsites.net'

};

export const FormValidationsConstant = {
  maxMenAge: 50,
  MaleSexCode: 'M',
  linkCotizadores: 'https://cotizadores.wwseguros.com.do/?cia=',
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
    'Persona políticamente expuesta', 'Contratante',
    'Perfil Financiero', 'Dependientes',
    'Sección A', 'Sección B',
    'Sección C Beneficiarios Primarios',
    'Beneficiario(s) Contingente(s)',
    'Comentarios adicionales']
};

