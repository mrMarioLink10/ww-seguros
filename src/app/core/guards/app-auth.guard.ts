import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, Data, ActivatedRoute } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from '../services/dialog/dialog-option.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard implements CanLoad {

  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService,
    private dialog: MatDialog,
    private dialogOption: DialogOptionService,
    private route: ActivatedRoute,
  ) {
    super(router, keycloakAngular);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        this.authenticated = await this.keycloakAngular.isLoggedIn();
        this.roles = await this.keycloakAngular.getUserRoles(true);
        console.log('roles:', this.keycloakAngular.getUserRoles(true));
        console.log('acceso permitido a: ', route.data.accessRoles)
        const result = await this.checkAccessAllowed(route.data.accessRoles);
        resolve(result);
      } catch (error) {
        console.error(error);
        reject('An error happened during access validation. Details:' + error);
      }
    });
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkAccessAllowed(route.data.accessRoles);
  }

  checkAccessAllowed(data: Data): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login().catch(e => console.error(e));
        return reject(false);
      }
      const requiredRoles = data as string[];
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        if (granted === false) {
          console.error('No tienes acceso.');
          this.router.navigate(['not-found'], { relativeTo: this.route });
        }
        resolve(granted);
      }
    });
  }
}