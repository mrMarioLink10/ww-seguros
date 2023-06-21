import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class MajorExpensesService {

  id = null;
  idKNOWCustomer = null;

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  postRequest(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Solicitudes/salud`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    console.log(environment.apiUrl);
    return this.http.get(`${environment.apiUrl}/api/Solicitudes/salud/${id}`, { params: { country: this.country.codigoPortal } });
  }


  sendRequest(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Solicitudes/salud/confirm/${id}`, id);
  }
  returnCotizacionData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Solicitudes/salud/cotizacion/${id}`, { params: { country: this.country.codigoPortal } });
  }
  getID(id) {
    this.id = id;
    // return this.returnData(id);
  }
}
