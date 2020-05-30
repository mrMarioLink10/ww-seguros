import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAccessToken() {
    const token = localStorage.getItem('ang-token');

    return token;
  }

  getUserInformation() {
    const user = JSON.parse(localStorage.getItem('user-information'));

    return user;
  }

  getRoleCotizador() {
    const user = this.getUserInformation();
    for (const key in user.resource_access.cotizador.roles) {
      if (user.resource_access.cotizador.roles.hasOwnProperty(key)) {
        if (user.resource_access.cotizador.roles[key] === 'WWS' || user.resource_access.cotizador.roles[key] === 'WMA') {
          return user.resource_access.cotizador.roles[key];
        }
      }
    }
  }

  getInsurancePeople(idNumber: string) {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/${idNumber}`);
  }

  getWholeInsurancePeople() {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa`);
  }

  getQuotes(idNumber: string, requestType: string) {
    return this.http.get(`${environment.apiUrl}/api/Cotizaciones/${idNumber}/${requestType}`);
  }

  getWholeQuotes() {
    return this.http.get(`${environment.apiUrl}/api/Cotizaciones`);
  }
}
