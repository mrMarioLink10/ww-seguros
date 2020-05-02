import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(
  ) { }
  // keycloak init options
  initOptions = {
    url: environment.keycloak.url, realm: environment.keycloak.realm, clientId: environment.keycloak.clientId
  };

  keycloak = Keycloak(this.initOptions);


  initKeyCloak() {
    this.keycloak.init({ onLoad: 'login-required' }).then((auth) => {

      if (!auth) {
        window.location.reload();
      } else {
        console.log('Authenticated');
        console.log(this.keycloak);

      }

      // bootstrap after authentication is successful.
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));

      localStorage.setItem('ang-token', this.keycloak.token);
      localStorage.setItem('ang-refresh-token', this.keycloak.refreshToken);
      localStorage.setItem('user-information', JSON.stringify(this.keycloak.tokenParsed));

      setTimeout(() => {
        this.keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed' + refreshed);
          } else {
            console.warn('Token not refreshed, valid for '
              + Math.round(this.keycloak.tokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
        }).catch(() => {
          console.error('Failed to refresh token');
        });


      }, 60000);

    }).catch(() => {
      console.error('Authenticated Failed');
    });

  }

  logOut() {

  }
}
