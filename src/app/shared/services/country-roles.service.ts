import { Injectable } from '@angular/core';
import { CountryTypes } from '../utils/keys/country-types';
import { CountryRoleTypes } from '../utils/keys/country-role-types';
import {UserService} from '../../core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CountryRolesService {

  countries: CountryTypes[] = [CountryTypes.rd, CountryTypes.pn, CountryTypes.py];
  roles: CountryRoleTypes[] = [CountryRoleTypes.WWS, CountryRoleTypes.WMA, CountryRoleTypes.WPY];

  constructor(
    private userService: UserService
  ) { }

  getRoleByCountry(country: CountryTypes) {
    return this.roles[this.countries.indexOf(country)];
  }

  getCountryByRole(role: CountryRoleTypes) {
    return this.countries[this.roles.indexOf(role)];
  }

  getCountriesByRoles(roles: []) {
    const countries = [];
    const filteredRoles = roles.filter(role => role === CountryRoleTypes[role]);

    filteredRoles.forEach(filteredRole => {
      countries.push(this.getCountryByRole(filteredRole));
    });

    return countries;
  }

  userHasMoreThanOneRole(): boolean {
    const roles = this.userService.getRoles().find(role => CountryRoleTypes[role] === role);
    return roles.length > 1;
  }
}
