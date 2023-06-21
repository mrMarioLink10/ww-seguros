import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CountryRolesService} from '../../../../shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  BASE_URL: any = `${environment.apiUrl}`;

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private httpClient: HttpClient, private countryRolesService: CountryRolesService) { }

  getPolicies(params: HttpParams) {
    return this.httpClient.get(`${this.BASE_URL}/api/ConsultaPoliza`, {params});
  }

  getPolicyDetails(policyId: string) {
    return this.httpClient.get(`${this.BASE_URL}/api/ConsultaPoliza/detalle/${policyId}`, { params: { country: this.country.codigoPortal } });
  }

  getIdNumbers(): Observable<any> {
    const country = this.countryRolesService.getLocalStorageCountry();
    return this.httpClient.get(`${environment.apiUrl}/api/DatosEmpresa/autocomplete`, { params: { country: country.codigoPortal } });
  }
}
