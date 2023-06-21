import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';



@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private route: Router, private countryRolesService: CountryRolesService) { }

  id = null;

  postClaim(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Reclamaciones`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Reclamaciones/${id}`, { params: { country: this.country.codigoPortal } });
  }
  getID(id) {
    this.id = id;
    this.route.navigateByUrl('/dashboard/claims/new-claim/claim');
  }

}
