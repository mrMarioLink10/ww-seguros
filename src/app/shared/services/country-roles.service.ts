import { Injectable } from '@angular/core';
import { CountryTypes } from '../utils/keys/country-types';
import { CountryRoleTypes } from '../utils/keys/country-role-types';
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

  getRoleByCountry(country: CountryTypes, countriesAndRoles: ICountryRole[]) {
      return countriesAndRoles.find(countriesAndRole =>
        countriesAndRole.codigoPortal.toLowerCase() === country.toLowerCase()).dominio;
  }

  getCountryByRole(role: CountryRoleTypes | string, countriesAndRoles: ICountryRole[]) {
    return countriesAndRoles.find(countriesAndRole =>
      countriesAndRole.dominio.toLowerCase() === role.toLowerCase()).codigoPortal.toLowerCase();
  }

  getCiaByRole(role: CountryRoleTypes | string, countriesAndRoles: ICountryRole[]) {
    return countriesAndRoles.find(countriesAndRole =>
      countriesAndRole.dominio.toLowerCase() === role.toLowerCase()).codigoCompania;
  }

  getCountriesByRoles(roles: string[], countriesAndRoles: ICountryRole[]) {
    const countries = [];
    const filteredRoles = roles.filter(role => (countriesAndRoles.some(countryRole => countryRole.dominio === role)));

    filteredRoles.forEach(filteredRole => {
      countries.push(this.getCountryByRole(filteredRole, countriesAndRoles));
    });

    return countries;
  }

  userHasMoreThanOneRole(): boolean {
    const roles = this.userService.getRoles().find(role => role.length === 3);
    return roles.length > 1;
  }

  getCountriesAndRoles(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/userinfo/countries`);
  }

  getLocalStorageCountry() {
    return localStorage.getItem('countryCode') || CountryTypes.rd;
  }
}
