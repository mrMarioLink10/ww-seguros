import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyFilterService {

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  getClientNames(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/ConsultaPoliza/clients`, { params: { country: this.country.codigoPortal } });
  }

}
