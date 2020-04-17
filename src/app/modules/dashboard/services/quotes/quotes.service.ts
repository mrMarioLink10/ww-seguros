import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  BASE_URL: any = 'https://wwsdevportalbackend.azurewebsites.net/api/Cotizaciones';

  constructor(private _http: HttpClient) { }

  getQuotes(params: HttpParams) {
    return (this._http.get(this.BASE_URL, {params}));
  }
}
