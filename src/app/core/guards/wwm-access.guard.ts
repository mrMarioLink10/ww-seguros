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
import {CountryRolesService} from '../../shared/services/country-roles.service';
import {CountryRoleTypes} from '../../shared/utils/keys/country-role-types';

@Injectable({
  providedIn: 'root'
})
export class WwmAccessGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private countryRolesService: CountryRolesService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.countryRolesService.getLocalStorageCountry().dominio);
    if (this.countryRolesService.getLocalStorageCountry().dominio !== CountryRoleTypes.WWS) {
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
