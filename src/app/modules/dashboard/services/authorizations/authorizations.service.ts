import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService {

  BASE_URL: any = 'https://wwsdevportalbackend.azurewebsites.net/api/Precertificado';

  constructor(private _http: HttpClient) { }

  getAuthoriations(params: HttpParams) {
    return (this._http.get(this.BASE_URL, {params}));
  }
}
