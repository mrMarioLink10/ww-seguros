import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {UserService} from '../../../../core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  BASE_URL: any = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getBills(httpParams: HttpParams) {
    return this.httpClient.get(`${this.BASE_URL}/api/ConsultaFacturas`, {params: httpParams});
  }

}
