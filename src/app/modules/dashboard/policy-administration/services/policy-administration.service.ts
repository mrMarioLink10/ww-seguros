import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyAdministrationService {

  constructor(private http: HttpClient) { }

  // postPolicyAdministration(body) {

  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };

  //   console.log('body:', body);
  //   return this.http.post(`${environment.apiUrl}/api/`, body, httpOptions);
  // }

  // returnData(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/api/`);
  // }

  getIdNumbers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/autocomplete`);
  }
}
