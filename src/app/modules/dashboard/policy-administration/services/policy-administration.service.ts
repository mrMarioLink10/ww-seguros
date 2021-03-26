import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyAdministrationService {

  constructor(private http: HttpClient) { }

  postPolicyAdministration(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/SolicitudesPdf/pdfforms`, body, httpOptions);
  }

  // returnData(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/api/`);
  // }

  getIdNumbers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/autocomplete`);
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  confirmRequest(id: number) {
    return (this.http.post(`${environment.apiUrl}/SolicitudesPdf/Confirm/${id}`, { params: { id: id.toString() } }));
  }

  rejectRequest(id: number) {
    return (this.http.post(`${environment.apiUrl}/SolicitudesPdf/Deny/${id}`, { params: { id: id.toString() } }));
  }
}
