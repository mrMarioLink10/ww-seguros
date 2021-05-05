import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// tslint:disable: max-line-length
export class ChangeService {

  constructor(private http: HttpClient) { }

  getDynamicData(guid: string, cotizacionId: string, country?: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDinamica/${guid}/${cotizacionId}`, { params: { guid, cotizacionId, country } }));
  }
}
