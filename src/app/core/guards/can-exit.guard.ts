import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanExit {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanExitGuard implements CanDeactivate<CanExit> {
  canDeactivate(
    component: CanExit,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {


    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
