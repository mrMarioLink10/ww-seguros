import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

BASE_URL: any = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

getReceipts(httpParams: HttpParams) {
    return this.httpClient.get(`${this.BASE_URL}/api/ `, {params: httpParams});
  }
}
