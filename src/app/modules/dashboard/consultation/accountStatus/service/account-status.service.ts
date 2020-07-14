import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountStatusService {

  BASE_URL: any = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

// getStatus(httpParams: HttpParams, polizaId) {
//     return this.httpClient.get(`${this.BASE_URL}/api/DatosEmpresa/Recibos/${polizaId}`, {params: httpParams});
//   }
}
