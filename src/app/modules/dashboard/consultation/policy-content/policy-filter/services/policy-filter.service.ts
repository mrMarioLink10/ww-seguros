import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyFilterService {

  constructor(private http: HttpClient) { }

  getClientNames(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/ConsultaPoliza/clients`);
  }

}
