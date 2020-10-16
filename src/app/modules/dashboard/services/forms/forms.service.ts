import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  BASE_URL: any = `${environment.apiUrl}/api/DynamicForm`;

  constructor(private http: HttpClient) { }

  getData(params: HttpParams) {
    return (this.http.get(this.BASE_URL, { params }));
  }

  goToTop(el: HTMLElement) {
    el.scrollIntoView();
  }
}
