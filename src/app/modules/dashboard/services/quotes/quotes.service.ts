import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  BASE_URL: any = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private route: Router) { }

  getQuotes(params: HttpParams) {
    return (this.http.get(`${environment.apiUrl}/api/Cotizaciones`, {params:  params}));
  }
  returnDataSalud(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Cotizaciones/${id}/salud`);
  }
}
