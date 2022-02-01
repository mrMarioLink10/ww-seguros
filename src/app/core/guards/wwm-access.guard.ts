import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class WwmAccessGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if ((this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA'))) {
        let country = localStorage.getItem('countryCode');
        // console.log('countryCode es igual a ' + country);
        let countryRole = '';
        if (country == 'rd') {
          countryRole = 'WWS';
          // console.log('el country es igual a wws');
        }
        else if (country == 'pn') {
          countryRole = 'WMA';
          // console.log('el country es igual a wwm');
        }

        if (countryRole === 'WMA') {
          console.log('No estás logueado');
          this.router.navigate(['/']);
          return false;
        }
      }
      else if (this.userService.getRoleCotizador() === 'WMA') {
      console.log('No estás logueado');
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
