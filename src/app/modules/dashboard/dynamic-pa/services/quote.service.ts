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

  getDeductibleSelected(poliza: string, selectionId: string, country: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDeducibleSeleccionado/${poliza}/${selectionId}`, { params: { poliza, selectionId, country } }));
  }

  getProductChangeSelected(poliza: string, selectionId: string, country: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudCambioSeleccionado/${poliza}/${selectionId}`, { params: { poliza, selectionId, country } }));
  }
}
