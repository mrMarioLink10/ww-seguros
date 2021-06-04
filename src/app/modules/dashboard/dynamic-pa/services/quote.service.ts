// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(private http: HttpClient) { }

  getDeductible(poliza: string, country: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/Deducible/${poliza}`, { params: { poliza, country } }));
  }

  getProductChange(poliza: string, country: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/CambioProducto/${poliza}`, { params: { poliza, country } }));
  }

  saveTypeSelected(isDeducible: boolean, poliza: string, selectionId: string, country: string) {
    const type = isDeducible ? 'SolicitudDeducibleSeleccionado' : 'SolicitudCambioSeleccionado';
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/${type}/${poliza}/${selectionId}`, { params: { poliza, selectionId, country } }));
  }

  postDynamicRequest(body) {
    return (this.http.post(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDinamica`, body));
  }
}
