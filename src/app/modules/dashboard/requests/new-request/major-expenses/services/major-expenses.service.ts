import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MajorExpensesService {

  constructor(private http: HttpClient) { }

  postRequest(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.apiUrl}/api/Solicitudes/salud`, body, httpOptions);
  }

  returnData(id):Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/Solicitudes/salud/${id}`)
  }

  id=null;
  idKNOWCustomer=null;
  getID(id){
      this.id=id;
      console.log("hola, soy ",id);
      //return this.returnData(id);
  }
}
