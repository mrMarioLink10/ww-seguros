import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CountryRolesService} from '../../../../../shared/services/country-roles.service';


@Injectable({
  providedIn: 'root'
})
export class NewAuthorizationService {

  constructor(private http: HttpClient, private route: Router, private countryRolesService: CountryRolesService) { }

  id = null;

  country = this.countryRolesService.getLocalStorageCountry();

  postClaim(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Precertificado`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Precertificado/${id}`, { params: { country: this.country.codigoPortal } });
  }

  sendAuthorization(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Precertificado/confirm/${id}`, id);
  }

  getID(id) {
    this.id = id;
    this.route.navigateByUrl(`/dashboard/authorizations/new-authorization/${id}`);
  }

  getIdNumbers(): Observable<any> {
    const country = this.countryRolesService.getLocalStorageCountry();
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/autocomplete`, { params: { country: country.codigoPortal } });
  }

  getServiceCenters(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetCentrosEspecializados`, { params: { country: this.country.codigoPortal } });
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetMedicos`, { params: { country: this.country.codigoPortal } });
  }
}
