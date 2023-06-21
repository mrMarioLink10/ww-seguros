import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
// tslint:disable: max-line-length
export class ChangeService {

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  getDynamicData(guid: string, cotizacionId: string, country?: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDinamica/${guid}/${cotizacionId}`, { params: { guid, cotizacionId, country } }));
  }

  getExistantDynamicData(guid: string) {
    return (this.http.get(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDinamica/${guid}`, { params: { guid, country: this.country.codigoPortal } }));
  }

  postDynamicData(body: any, country?: string) {
    return (this.http.post(`${environment.apiUrl}/api/FlujoClientesExistenteDinamico/SolicitudDinamica`, body, { params: { country: this.country.codigoPortal } }));
  }

  getQuote(quoteId, ramo){
    return (this.http.get(`${environment.apiUrl}/api/Cotizaciones/${quoteId}/${ramo}`, { params: { country: this.country.codigoPortal } }));
    //
  }
}
