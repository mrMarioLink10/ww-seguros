import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  BASE_URL: any = `${environment.apiUrl}/api`;
  
  country = this.countryRolesService.getLocalStorageCountry();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: { country: this.country.codigoPortal }
  };

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  getRequestData(type, key) {
    return (this.http.get(`${this.BASE_URL}/SolicitudesUsuariosAnonimos/${type}/${key}`, { params: { country: this.country.codigoPortal } }));
  }

  saveRequestData(type, key, body) {
    return (this.http.post(`${this.BASE_URL}/SolicitudesUsuariosAnonimos/${type}/${key}`, body, this.httpOptions));
  }

  sendRequestData(type, id) {
    return (this.http.post(`${this.BASE_URL}/SolicitudesUsuariosAnonimos/${type}/confirm/${id}`, id));
  }

  clearArchives(formName) {
    formName.setValue('');
  }

  downloadArchives(event, control: string) {
    event.preventDefault();
    event.stopPropagation();
    const linkSource = control;
    const downloadLink = document.createElement('a');

    let type = '';
    let haveToCount = false;

    for (let i = 0; i < control.length; i++) {
      if (control.charAt(i) === ';') {
        haveToCount = false;
        break;
      }

      if (haveToCount) { type += control.charAt(i); }

      if (control.charAt(i) === '/') { haveToCount = true; }
    }

    if (type === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') { type = 'csv'; }
    if (type === 'plain') { type = 'txt'; }

    const fileNumber = Math.floor(Math.random() * 10000);
    const fileName = `wwfile${fileNumber}.${type}`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  goToTop(el: HTMLElement) {
    el.scrollIntoView();
  }

  getPhysicalObligatoryOptions() {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/ActividadesPersonaFisica`, { params: { country: this.country.codigoPortal }});
  }

  getJuridicalObligatoryOptions() {
    return this.http.get(`${environment.apiUrl}/api/DatosEmpresa/ActividadesPersonaJuridica`, { params: { country: this.country.codigoPortal }});
  }
}
