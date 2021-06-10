import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PolicyAdministrationService } from './policy-administration.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyAdministationResolverService {

  constructor(
    private dialog: MatDialog,
    private policyAdministrationService: PolicyAdministrationService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return this.policyAdministrationService.getRequest(id)
      .pipe(mergeMap((data: any) => {
        if (data.data) {
          console.log('RESOLVER:', data.data);
          return of(data.data);
        } else {
          console.log('RESOLVER ERROR: ', data);
          return EMPTY;
        }
      })
      );
  }
}

