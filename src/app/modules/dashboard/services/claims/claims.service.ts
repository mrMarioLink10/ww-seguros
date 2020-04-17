import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  BASE_URL: any = 'https://wwsdevportalbackend.azurewebsites.net/api';

  constructor(private _http: HttpClient) { }

  getClaims(params) {
    return (this._http.get(`${this.BASE_URL}/Reclamaciones`, {params}));
  }

  getRefunds(params) {
    return (this._http.get(`${this.BASE_URL}/Reembolsos`, {params}));
  }

}
