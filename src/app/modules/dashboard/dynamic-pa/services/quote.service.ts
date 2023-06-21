// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  getDeductible(poliza: string, country: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/Deducible/${poliza}`, { params: { poliza, country } }));
  }

  getProductChange(poliza: string, country: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/CambioProducto/${poliza}`, { params: { poliza, country } }));
  }

  saveTypeSelected(isDeducible: boolean, poliza: string, selectionId: string, country: string) {
    const type = isDeducible ? 'SolicitudDeducibleSeleccionado' : 'SolicitudCambioSeleccionado';
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/${type}/${poliza}/${selectionId}`, { params: { poliza, selectionId, country: this.country.codigoPortal } }));
  }

  postDynamicRequest(body) {
    return (this.http.post(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDinamica`, body, { params: { country: this.country.codigoPortal } }));
  }
}
