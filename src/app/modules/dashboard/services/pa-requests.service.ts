import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaRequestsService {

  BASE_URL: any = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  getRequests(params: HttpParams) {
    return (this.http.get(`${this.BASE_URL}/SolicitudesPdf`, { params }));
  }
}
