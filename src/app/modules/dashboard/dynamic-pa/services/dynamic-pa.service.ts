import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DynamicPaService {

  constructor(private http: HttpClient) { }

  getRequests(params: HttpParams): Observable<any> {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico`, { params }));
  }

  sendRequest(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/confirm/{id}${id}`, id);
  }
}
