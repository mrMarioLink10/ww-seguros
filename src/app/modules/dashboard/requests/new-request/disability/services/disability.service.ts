import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisabilityService {

  currencyArray = [

    {
      value: 'Dolares',
      viewValue: 'Dolares'
    },
    {
      value: 'Pesos Dominicanos',
      viewValue: 'Pesos Dominicanos'
    }

  ];

  lifeArray = [
    {
      value: 'us$ 10,000',
      viewValue: 'US$ 10,000'
    },

    {
      value: 'us$ 20,000',
      viewValue: 'US$ 20,000'
    },

    {
      value: 'us$ 30,000',
      viewValue: 'US$ 30,000'
    },

    {
      value: 'us$ 40,000',
      viewValue: 'US$ 40,000'
    },

    {
      value: 'us$ 50,000',
      viewValue: 'US$ 50,000'
    },

    {
      value: 'us$ 60,000',
      viewValue: 'US$ 60,000'
    },

    {
      value: 'us$ 70,000',
      viewValue: 'US$ 70,000'
    },

    {
      value: 'us$ 80,000',
      viewValue: 'US$ 80,000'
    },

    {
      value: 'us$ 90,000',
      viewValue: 'US$ 90,000'
    },

    {
      value: 'us$ 100,000',
      viewValue: 'US$ 100,000'
    },

    {
      value: 'us$ 110,000',
      viewValue: 'US$ 110,000'
    },

    {
      value: 'us$ 120,000',
      viewValue: 'US$ 120,000'
    },

    {
      value: 'us$ 130,000',
      viewValue: 'US$ 130,000'
    },

    {
      value: 'us$ 140,000',
      viewValue: 'US$ 140,000'
    },

    {
      value: 'us$ 150,000',
      viewValue: 'US$ 150,000'
    },

    {
      value: 'us$ 160,000',
      viewValue: 'US$ 160,000'
    },

    {
      value: 'us$ 170,000',
      viewValue: 'US$ 170,000'
    },

    {
      value: 'us$ 180,000',
      viewValue: 'US$ 180,000'
    },

    {
      value: 'us$ 190,000',
      viewValue: 'US$ 190,000'
    },

    {
      value: 'us$ 200,000',
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

  constructor(private http: HttpClient) { }

  postRequest(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.baseUrl}/api/Solicitudes/disability`, body, httpOptions);
  }
}
