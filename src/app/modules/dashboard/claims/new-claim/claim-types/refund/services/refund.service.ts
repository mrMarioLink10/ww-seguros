import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {CountryRolesService} from '../../../../../../../shared/services/country-roles.service';



@Injectable({
  providedIn: 'root'
})
export class RefundService {

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private route: Router, private countryRolesService: CountryRolesService) { }

  id = null;

  postClaim(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Reembolsos`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Reembolsos/${id}`, { params: { country: this.country.codigoPortal } });
  }

  sendRefund(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Reembolsos/confirm/${id}`, id);
  }

  getID(id) {
    this.id = id;
    this.route.navigateByUrl(`/dashboard/claims/new-claim/refund/${id}`);
  }

  getIdNumbers(): Observable<any> {
    const country = this.countryRolesService.getLocalStorageCountry();
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/autocomplete`, { params: { country: country.codigoPortal } });
  }

  getProveedores(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetOtrosProveedores`, { params: { country: this.country.codigoPortal } });
  }

  getBanks(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetBancos`, { params: { country: this.country.codigoPortal } });
  }

  getCategoriasDatosProveedores(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetDatosProveedores`, { params: { country: this.country.codigoPortal } });
  }
}
