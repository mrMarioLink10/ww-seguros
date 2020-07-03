import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  BASE_URL: any = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  getClaims(httpParams: HttpParams, policyId) {
    return this.httpClient.get(`${this.BASE_URL}/api/DatosEmpresa/Reclamos/${policyId}`, {params: httpParams});
  }

}
