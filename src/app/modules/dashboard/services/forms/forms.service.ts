import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  BASE_URL: any = `${environment.apiUrl}/api/DynamicForm`;

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  getData(params: HttpParams) {
    return (this.http.get(this.BASE_URL, { params }));
  }

  goToTop(el: HTMLElement) {
    el.scrollIntoView();
  }

  postData(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    return this.http.post(`${environment.apiUrl}/api/DynamicForm`, body, httpOptions);
  }

  postDynamicForm(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    return this.http.post(`${environment.apiUrl}/api/DynamicPersistanceForm`, body, httpOptions);
  }

  sendData(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/DynamicForm/confirm/${id}`, id);
  }

  getTargetData(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DynamicForm/${id}`, { params: { country: this.country.codigoPortal } });
  }

  getDynamicForm(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DynamicPersistanceForm/NewForm/${id}`, { params: { country: this.country.codigoPortal } });
  }

  getCreatedDynamicForm(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/DynamicPersistanceForm/${id}`, { params: { country: this.country.codigoPortal } });
  }
}
