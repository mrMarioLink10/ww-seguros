import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private http: HttpClient, private route: Router) { }

  id = null;

  postClaim(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Reembolsos`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Reembolsos/${id}`);
  }

  sendRefund(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Reembolsos/confirm/${id}`, id);
  }

  getID(id) {
    this.id = id;
    this.route.navigateByUrl(`/dashboard/claims/new-claim/refund/${id}`);
  }

  getIdNumbers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa`);
  }
}
