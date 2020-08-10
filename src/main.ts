import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Keycloak from 'keycloak-js';

if (environment.production) {
  enableProdMode();

  if (window) {
    // tslint:disable-next-line: only-arrow-functions
    window.console.log = window.console.warn = window.console.info = function () {
      // Don't log anything.
    };
  } else if (!window.console) {
    const console = {
      log() { },
      warn() { },
      error() { },
      time() { },
      timeEnd() { }
    };
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// keycloak init options
const initOptions = {
  url: 'https://sso.wwseguros.com.do:8443/auth', realm: 'worldwide', clientId: 'cotizador'
};

// const keycloak = Keycloak(initOptions);

// keycloak.init({ onLoad: 'login-required' }).then((auth) => {

//   if (!auth) {
//     window.location.reload();
//   } else {
//     console.log('Authenticated');
//     console.log(keycloak);
//     console.log(Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');

//   }

//   platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));

//   localStorage.setItem('ang-token', keycloak.token);
//   localStorage.setItem('ang-refresh-token', keycloak.refreshToken);
//   localStorage.setItem('user-information', JSON.stringify(keycloak.tokenParsed));

//   setInterval(() => {

//     keycloak.updateToken(300).then((refreshed) => {
//       if (refreshed) {
//         console.log('No te mentire, se ve muy fresco el pana token, se vence en: '
//           + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' segundos');
//         localStorage.setItem('ang-token', keycloak.token);

//       } else {
//         console.warn('Token no refrescado, token no refrescado, donde estan sus padres? Se vence en: '
//           + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' segundos');
//       }
//     }).catch(() => {
//       console.error('Failed to refresh token');
//     });

//   }, 180000);

// }).catch((err) => {
//   console.log(err);
//   window.location.reload();

//   console.error('Authenticated Failed');


// });

