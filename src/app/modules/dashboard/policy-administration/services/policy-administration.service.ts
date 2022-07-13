import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {CountryRolesService} from '../../../../shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyAdministrationService {

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  postPolicyAdministration(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/SolicitudesPdf/pdfforms`, body, httpOptions);
  }

  // returnData(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/api/`);
  // }

  getIdNumbers(): Observable<any> {

    const country = this.countryRolesService.getLocalStorageCountry();
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/autocompleteDinamicos`, { params: { country } });
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  confirmRequest(id: number) {
    return (this.http.post(`${environment.apiUrl}/api/SolicitudesPdf/confirm/${id}`, { params: { id: id.toString() } }));
  }

  rejectRequest(id: number) {
    return (this.http.post(`${environment.apiUrl}/api/SolicitudesPdf/deny/${id}`, { params: { id: id.toString() } }));
  }

  getRequests(params: HttpParams) {
    return (this.http.get(`${environment.apiUrl}/api/SolicitudesPdf`, { params }));
  }

  getRequest(id: number) {
    return this.http.get(`${environment.apiUrl}/api/SolicitudesPdf/${id}`, { params: { id: id.toString() } });
  }
}
