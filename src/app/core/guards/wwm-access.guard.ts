import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user/user.service';
import {CountryRolesService} from '../../shared/services/country-roles.service';
import {CountryTypes} from '../../shared/utils/keys/country-types';
import {CountryRoleTypes} from '../../shared/utils/keys/country-role-types';

@Injectable({
  providedIn: 'root'
})
export class WwmAccessGuard implements CanActivate, CanActivateChild {

  constructor(
    private userService: UserService,
    private router: Router,
    private countryRolesService: CountryRolesService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ((this.countryRolesService.userHasMoreThanOneRole())) {
        const country = this.countryRolesService.getLocalStorageCountry();

      /*  if (country.dominio !== CountryRoleTypes.WWS) {
            console.log('No estás logueado aaa');
            this.router.navigate(['/']);
            return false;
        }*/
      } else if (this.userService.getRoleCotizador() !== CountryRoleTypes.WWS) {
      console.log('No estás logueado aa');
      this.router.navigate(['/']);
      return false;
    }

      return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
