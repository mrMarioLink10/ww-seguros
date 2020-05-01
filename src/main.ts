import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Keycloak from 'keycloak-js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// keycloak init options
const initOptions = {
  url: 'https://sso.wwseguros.com.do:8443/auth', realm: 'worldwide', clientId: 'cotizador'
};

const keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: 'login-required' }).then((auth) => {

  if (!auth) {
    window.location.reload();
  } else {
    console.log('Authenticated');
    console.log(keycloak);

  }

  // bootstrap after authentication is successful.
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

  localStorage.setItem('ang-token', keycloak.token);
  localStorage.setItem('ang-refresh-token', keycloak.refreshToken);
  localStorage.setItem('user-information', JSON.stringify(keycloak.tokenParsed));

  setTimeout(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });


  }, 60000);

}).catch(() => {
  console.error('Authenticated Failed');
});

