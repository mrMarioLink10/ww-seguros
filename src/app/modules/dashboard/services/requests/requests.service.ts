import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  BASE_URL: any = `${environment.apiUrl}/api/Solicitudes`;

  constructor(private _http: HttpClient) { }

  getRequests(params: HttpParams) {
    return (this._http.get(this.BASE_URL, { params }));
  }

  downloadArchives(event, control: string) {
    event.preventDefault();
    event.stopPropagation();
    const linkSource = control;
    const downloadLink = document.createElement('a');

    let type = '';
    let haveToCount = false;

    for (let i = 0; i < control.length; i++) {
      if (control.charAt(i) === ';') {
        haveToCount = false;
        break;
      }

      if (haveToCount) { type += control.charAt(i); }

      if (control.charAt(i) === '/') { haveToCount = true; }
    }

    if (type === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') { type = 'csv'; }
    if (type === 'plain') { type = 'txt'; }
    if (type === 'vnd.openxmlformats-officedocument.wordprocessingml.document') { type = 'docx'; }

    const fileNumber = Math.floor(Math.random() * 10000);
    const fileName = `wwfile${fileNumber}.${type}`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  clearArchives(formName) {
    formName.setValue('');
  }
}
