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

}
