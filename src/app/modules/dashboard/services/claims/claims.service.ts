import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  BASE_URL: any = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  getClaims(params: HttpParams) {
    return (this.http.get(`${this.BASE_URL}/Reclamaciones`, { params }));
  }

  getRefunds(params: HttpParams) {
    return (this.http.get(`${this.BASE_URL}/Reembolsos`, { params }));
  }

}
