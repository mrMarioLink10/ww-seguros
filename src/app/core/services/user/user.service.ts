import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getAccessToken() {
    return localStorage.getItem('ang-token');
  }

  getUserInformation() {
    return JSON.parse(localStorage.getItem('user-information'));
  }

  getRoles() {
    this.checkValidAccess();
    const user = this.getUserInformation();

    return user.resource_access.cotizador.roles;
  }

  checkValidAccess() {
    let isRD = "true";
    const user = this.getUserInformation();
    for (const key in user.resource_access.cotizador.roles) {
      if (user.resource_access.cotizador.roles.hasOwnProperty(key)) {
        if (user.resource_access.cotizador.roles[key] === 'WMA') {
          isRD = "false";
          break;
        }
      }
    }
    let isNdaReady = (user && user.nda !== undefined && user.nda !== null);
    if (!isNdaReady) {
      console.log('FUNCIONAAAAA');
      window.location.href = environment.urlNotAccess + isRD;
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
