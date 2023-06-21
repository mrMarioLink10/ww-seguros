import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private countryRolesService: CountryRolesService) { }

  postSettings(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Setting`, body, httpOptions);
  }

  returnData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Setting`, { params: { country: this.country.codigoPortal } });
  }
}
