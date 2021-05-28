import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicPaService {

  constructor(private http: HttpClient) { }

  getRequests(params: HttpParams) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico`, { params }));
  }
}
