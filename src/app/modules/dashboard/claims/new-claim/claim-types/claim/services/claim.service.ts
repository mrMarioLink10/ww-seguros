import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient, private route:Router) { }

  postClaim(body) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log('body:', body);
    return this.http.post(`${environment.baseUrl}/api/Reclamaciones`, body, httpOptions);
  }

  returnData(id):Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/Reclamaciones/${id}`)
  }

  id=null;
  getID(id){
      this.id=id;
      this.route.navigateByUrl('/dashboard/claims/new-claim/claim');
  }
  
}
