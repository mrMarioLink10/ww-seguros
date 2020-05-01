import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  token: any;
  user: any;
  getAccessToken() {
    this.token = localStorage.getItem('ang-token');

    return this.token;

  }

  getUserInformation() {
    const user = localStorage.getItem('user-information');
    this.user = JSON.parse(user);

    return this.user;

  }
}
