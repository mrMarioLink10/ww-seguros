import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  BASE_URL: any = 'https://wwsdevportalbackend.azurewebsites.net/api/Solicitudes';

  constructor(private _http: HttpClient) { }

  getRequests(params: HttpParams) {
    return (this._http.get(this.BASE_URL, {params}));
  }
}
