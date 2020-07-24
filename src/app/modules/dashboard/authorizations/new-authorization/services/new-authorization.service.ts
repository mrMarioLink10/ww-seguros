import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewAuthorizationService {

  constructor(private http: HttpClient, private route: Router) { }

  id = null;

  postClaim(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Precertificado`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Precertificado/${id}`);
  }

  sendAuthorization(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Precertificado/confirm/${id}`, id);
  }

  getID(id) {
    this.id = id;
    this.route.navigateByUrl(`/dashboard/authorizations/new-authorization/${id}`);
  }

  getIdNumbers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/autocomplete`);
  }

  getServiceCenters(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetCentrosEspecializados`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/GetMedicos`);
  }
}
