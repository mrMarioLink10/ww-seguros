import { Injectable } from '@angular/core';
import {UserService} from '../../core/services/user/user.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICountryRole} from '../utils/interfaces/country-role.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryRolesService {
  BASE_URL: any = `${environment.apiUrl}/api`;

  country = {
    codigoCompania: '03',
    codigoPortal: 'RD',
    dominio: 'WWS',
  };

  private countriesAndRolesSubject: BehaviorSubject<ICountryRole[]> = new BehaviorSubject<ICountryRole[]>(null);
  countriesAndRoles$: Observable<ICountryRole[]> = this.countriesAndRolesSubject.asObservable();

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
  }

  countriesAndRolesData() {
    if (!this.countriesAndRolesSubject.value) {
      this.initializeCountriesAndRoles();
      return this.getCountriesAndRoles();
    }
    return this.countriesAndRoles$;
  }

  initializeCountriesAndRoles() {
    this.getCountriesAndRoles().subscribe(value => {
      this.countriesAndRolesSubject.next(value);
    });
  }

  userHasMoreThanOneRole(): boolean {
    const roles = this.userService.getRoles().find(role => role.length === 3);
    return roles.length > 1;
  }

  getCountriesAndRoles(): Observable<ICountryRole[] | any> {
    return this.http.get(`${this.BASE_URL}/userinfo/countries`, { params: { country: this.country.codigoPortal } });
  }

  userHasCountryRole(country: string, countryRoles: ICountryRole[]): boolean {
    return countryRoles.some(countryRole => countryRole.codigoPortal === country);
  }

  getLocalStorageCountry(): ICountryRole {
    try {
      const countryCode: ICountryRole = JSON.parse(localStorage.getItem('countryCode'));

      if (!countryCode || typeof countryCode !== 'object') {
        this.setCountryRole(this.country);
        return this.getLocalStorageCountry();
      }
      return JSON.parse(localStorage.getItem('countryCode'));
    } catch (e) {
      this.setCountryRole(this.country);
      return this.getLocalStorageCountry();
    }
  }

  setCountryRole(countryRole: ICountryRole) {
    localStorage.setItem('countryCode', JSON.stringify(countryRole));
    console.log('updated', countryRole);
  }
}
