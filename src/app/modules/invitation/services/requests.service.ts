import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  BASE_URL: any = `${environment.apiUrl}/api`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getRequestData(type, key) {
    return (this.http.get(`${this.BASE_URL}/SolicitudesUsuariosAnonimos/${type}/${key}`));
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
}
