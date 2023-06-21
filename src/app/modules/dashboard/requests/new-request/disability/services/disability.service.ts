import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Injectable({
  providedIn: 'root'
})
export class DisabilityService {

  currencyArray = [

    {
      value: 'DOLARES',
      viewValue: 'Dolares'
    },
    {
      value: 'PESOS DOMINICANOS',
      viewValue: 'Pesos Dominicanos'
    }

  ];

  lifeArray = [
    {
      value: 'US$ 10,000',
      viewValue: 'US$ 10,000'
    },

    {
      value: 'US$ 20,000',
      viewValue: 'US$ 20,000'
    },

    {
      value: 'US$ 30,000',
      viewValue: 'US$ 30,000'
    },

    {
      value: 'US$ 40,000',
      viewValue: 'US$ 40,000'
    },

    {
      value: 'US$ 50,000',
      viewValue: 'US$ 50,000'
    },

    {
      value: 'US$ 60,000',
      viewValue: 'US$ 60,000'
    },

    {
      value: 'US$ 70,000',
      viewValue: 'US$ 70,000'
    },

    {
      value: 'US$ 80,000',
      viewValue: 'US$ 80,000'
    },

    {
      value: 'US$ 90,000',
      viewValue: 'US$ 90,000'
    },

    {
      value: 'US$ 100,000',
      viewValue: 'US$ 100,000'
    },

    {
      value: 'US$ 110,000',
      viewValue: 'US$ 110,000'
    },

    {
      value: 'US$ 120,000',
      viewValue: 'US$ 120,000'
    },

    {
      value: 'US$ 130,000',
      viewValue: 'US$ 130,000'
    },

    {
      value: 'US$ 140,000',
      viewValue: 'US$ 140,000'
    },

    {
      value: 'US$ 150,000',
      viewValue: 'US$ 150,000'
    },

    {
      value: 'US$ 160,000',
      viewValue: 'US$ 160,000'
    },

    {
      value: 'US$ 170,000',
      viewValue: 'US$ 170,000'
    },

    {
      value: 'US$ 180,000',
      viewValue: 'US$ 180,000'
    },

    {
      value: 'US$ 190,000',
      viewValue: 'US$ 190,000'
    },

    {
      value: 'US$ 200,000',
      viewValue: 'US$ 200,000'
    },
  ];

  rentArray = [
    {
      value: 'us$ 1,000',
      viewValue: 'US$ 1,000'
    },

    {
      value: 'us$ 2,000',
      viewValue: 'US$ 2,000'
    },

    {
      value: 'us$ 3,000',
      viewValue: 'US$ 3,000'
    },

    {
      value: 'us$ 4,000',
      viewValue: 'US$ 4,000'
    },

    {
      value: 'us$ 5,000',
      viewValue: 'US$ 5,000'
    },

    {
      value: 'us$ 6,000',
      viewValue: 'US$ 6,000'
    },

    {
      value: 'us$ 7,000',
      viewValue: 'US$ 7,000'
    },

    {
      value: 'us$ 8,000',
      viewValue: 'US$ 8,000'
    },

    {
      value: 'us$ 9,000',
      viewValue: 'US$ 9,000'
    },

    {
      value: 'us$ 10,000',
      viewValue: 'US$ 10,000'
    },

    {
      value: 'us$ 11,000',
      viewValue: 'US$ 11,000'
    },

    {
      value: 'us$ 12,000',
      viewValue: 'US$ 12,000'
    }
  ];

  testArray = [
    {
      value: 'HEMOGRAMA',
      viewValue: 'HEMOGRAMA'
    },
    {
      value: 'ELECTROCARDIOGRAMA',
      viewValue: 'ELECTROCARDIOGRAMA'
    },
    {
      value: 'RAYOS X',
      viewValue: 'RAYOS X'
    },
    {
      value: 'ENDOSCOPIA',
      viewValue: 'ENDOSCOPIA'
    },
    {
      value: 'ULTRASONIDO',
      viewValue: 'ULTRASONIDO'
    },
    {
      value: 'SCAN',
      viewValue: 'SCAN'
    },
    {
      value: 'RESONANCIA MAGNÉTICA',
      viewValue: 'RESONANCIA MAGNÉTICA'
    },
    {
      value: 'OTROS',
      viewValue: 'OTROS'
    }
  ];

  id = null;

  country = this.countryRolesService.getLocalStorageCountry();

  constructor(private http: HttpClient, private route: Router, private countryRolesService: CountryRolesService) { }

  postRequest(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { country: this.country.codigoPortal }
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Solicitudes/disability`, body, httpOptions);
  }

  returnData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Solicitudes/disability/${id}`, { params: { country: this.country.codigoPortal } });
  }

  sendRequest(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Solicitudes/disability/confirm/${id}`, id);
  }

  getID(id) {
    this.id = id;
    console.log('hola, soy ', id);
    this.route.navigateByUrl('/dashboard/requests/new-requests/disability');
  }

}
