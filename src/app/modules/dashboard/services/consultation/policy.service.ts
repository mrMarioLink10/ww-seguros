import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  BASE_URL: any = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  getPolicies(params: HttpParams) {
    return this.httpClient.get(`${this.BASE_URL}/api/ConsultaPoliza`, {params});
  }

  getPolicyDetails(policyId: string) {
    return this.httpClient.get(`${this.BASE_URL}/api/ConsultaPoliza/detalle/${policyId}`);
  }
}
