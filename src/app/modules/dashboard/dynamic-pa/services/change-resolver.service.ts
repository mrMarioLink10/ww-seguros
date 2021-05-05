import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ChangeService } from './change.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeResolverService {

  constructor(
    private dialog: MatDialog,
    private changeService: ChangeService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const guid = route.params.guid;
    const cotizacionId = route.params.cotizacionId;
    const country = route.params.country;

    return this.changeService.getDynamicData(guid, cotizacionId, country)
      .pipe(mergeMap((data: any) => {
        if (data.data) {
          return of(data.data);
        } else {
          return EMPTY;
        }
      })
      );
  }
}
