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
    for (const key in user.resource_access.cotizador.roles) {
      if (user.resource_access.cotizador.roles.hasOwnProperty(key)) {
        if (user.resource_access.cotizador.roles[key] === 'WWS' || user.resource_access.cotizador.roles[key] === 'WMA') {
          return user.resource_access.cotizador.roles[key];
        }
      }
    }

  }
}
