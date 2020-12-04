import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://sso.wwseguros.com.do:8443/auth',
  realm: 'worldwide',
  clientId: 'cotizador',
};


export const environment = {
  production: true,
  instructivo: 'http://wwsdevportalbackend.azurewebsites.net/INSTRUCTIVO_V2.pdf',
  instructivoMedical: 'http://wwsdevportalbackend.azurewebsites.net/INSTRUCTIVO_WWM_V2.pdf',
  terminosCondiciones: 'http://wwsdevportalbackend.azurewebsites.net/TERMINOS_DE_USO.pdf',
  fileUrl: 'http://wwsdevportalbackend.azurewebsites.net',
  mailForHelp: 'ayuda_wws@wws.com.do',
  urlCotizadoresPdf: 'https://cotizadores.wwseguros.com.do:30443',
  urlCotizadores: 'https://cotizadores.wwseguros.com.do',
  urlCotizadoresBoth: 'https://cotizadores.wwseguros.com.do/?cia=',
  urlCotizadoresVida: 'https://cotizadores.wwseguros.com.do/vida',
  urlCotizadoresSalud: 'https://cotizadores.wwseguros.com.do/salud',
  mailForHelpPM: 'ayuda_wwma@wwmedicalassurance.com',
  baseUrl: 'https://portal.wwseguros.com.do/',
  keycloak: keycloakConfig,
  apiUrl: 'https://wwsdevportalbackend.azurewebsites.net',
  urlNotAccess: 'https://wwsdevportalbackend.azurewebsites.net/AccesoPortal/index/?location=',
  keycloakConfig
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
