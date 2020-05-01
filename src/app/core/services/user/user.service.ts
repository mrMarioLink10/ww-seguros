import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAccessToken() {
    const token = localStorage.getItem('ang-token');

    return token;
  }

  getUserInformation() {
    const user = JSON.parse(localStorage.getItem('user-information'));

    return user;
  }

  getRoleCotizador() {
    const user = this.getUserInformation();

    return user.resource_access.cotizador.roles[0];
  }
}
