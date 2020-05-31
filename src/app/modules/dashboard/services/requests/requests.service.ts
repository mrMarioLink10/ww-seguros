import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  BASE_URL: any = `${environment.apiUrl}/api/Solicitudes`;

  constructor(private _http: HttpClient) { }

  getRequests(params: HttpParams) {
    return (this._http.get(this.BASE_URL, {params}));
  }
}
