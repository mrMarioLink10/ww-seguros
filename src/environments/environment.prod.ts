import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'https://sso.wwseguros.com.do:8443/auth',
  realm: 'worldwide',
  clientId: 'cotizador',
};

export const environment = {
  production: true,
  instructivo: "http://wwsdevportalbackend.azurewebsites.net/INSTRUCTIVO_V2.pdf",
  instructivoMedical: "http://wwsdevportalbackend.azurewebsites.net/INSTRUCTIVO_WWM_V2.pdf",
  fileUrl: 'http://wwsdevportalbackend.azurewebsites.net',
  mailForHelp: "ayuda_wws@wws.com.do",
  urlCotizadores: "http://portalwwg.eastus.cloudapp.azure.com:3000",
  urlCotizadoresPdf: "http://portalwwg.eastus.cloudapp.azure.com:3031",
  urlCotizadoresBoth: "http://portalwwg.eastus.cloudapp.azure.com:3000/?cia=",
  urlCotizadoresVida: "http://portalwwg.eastus.cloudapp.azure.com:3000/vida",
  urlCotizadoresSalud: "http://portalwwg.eastus.cloudapp.azure.com:3000/salud",
  mailForHelpPM: "ayuda_wwma@wwmedicalassurance.com",
  baseUrl: 'https://wwsdevfrontend-staging.azurewebsites.net/',
  keycloak: keycloakConfig,
  apiUrl: 'https://wwsdevportalbackend.azurewebsites.net',
  urlNotAccess: 'https://wwsdevportalbackend.azurewebsites.net/AccesoPortal/index/?location=',
  keycloakConfig
};

export const FormValidationsConstant = {
  maxMenAge: 50,
  MaleSexCode: 'M',
  linkCotizadores: 'http://portalwwg.eastus.cloudapp.azure.com:3000/?cia=',
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

