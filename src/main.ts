import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Keycloak from 'keycloak-js';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { KeycloakService } from './app/core/services/keycloak/keycloak.service';

const injector = ReflectiveInjector.resolveAndCreate([KeycloakService]);
const keycloakService = injector.get(KeycloakService);

if (environment.production) {
  enableProdMode();
}

keycloakService.initKeyCloak();

