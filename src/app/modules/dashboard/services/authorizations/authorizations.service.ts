import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService {

  BASE_URL: any = `${environment.apiUrl}/api/Precertificado`;

  constructor(private _http: HttpClient) { }

  getAuthoriations(params: HttpParams) {

    return (this._http.get(this.BASE_URL, {params}));
  }
}
