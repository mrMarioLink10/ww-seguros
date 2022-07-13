import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UserService } from '../../../../../core/services/user/user.service';
import { KeycloakService } from '../../../../../core/services/keycloak/keycloak.service';
import { environment } from 'src/environments/environment';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import {CountryRoleTypes} from '../../../../../shared/utils/keys/country-role-types';
import {CountryRolesService} from '../../../../../shared/services/country-roles.service';
import {CountryTypes} from '../../../../../shared/utils/keys/country-types';
import {WWSLogoUrls} from './keys/WWS-logo-urls';
// tslint:disable: max-line-length

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  activeRoute = '';

  userName: string;
  userEmail: string;
  role: string;
  roles: any;
  country: string;
  imageSrc: string;
  countries: CountryTypes[];
  watchRouter: Subscription;

  newNotification = [
    {
      title: 'Solicitud - 356453',
      description: 'Cambio de estatus a “Adjuntar Expediente”.',
      date: 'Hace 3 horas'
    },
    {
      title: 'Solicitud - 356453',
      description: 'Cambio de estatus a “Adjuntar Expediente”.',
      date: 'Hace 3 horas'
    }
  ];

  oldNotification = [
    {
      title: 'Solicitud - 356453',
      description: 'Cambio de estatus a “Adjuntar Expediente”.',
      date: 'Hace 1 semana'
    }
  ];

  private mobileQueryListener: () => void;

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    public keycloakService: KeycloakService,
    private dialog: MatDialog,
    private dialogOption: DialogOptionService,
    private location: Location,
    protected keycloakAngular: KeycloakService,
    private countryRolesService: CountryRolesService,
  ) {
    this.role = this.userService.getRoleCotizador();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.watchRouter = router.events.subscribe((url: any) => {
      if (url.url !== undefined && url.url) {
        if (this.navigationInterceptor(url) !== undefined) {
          this.activeRoute = this.navigationInterceptor(url);
        }
      }
    });
  }

  ngOnInit() {
    this.userName = this.userService.getUserInformation().name;
    this.userEmail = this.userService.getUserInformation().email;
    this.roles = this.userService.getRoles();

    this.initializeCountryRole();
    this.countryRolesService.countriesAndRolesData().subscribe(value => {
      this.countries = this.countryRolesService.getCountriesByRoles(this.roles, value);
    });
    this.chooseWWLogo();

    console.log('country role: ', this.role);
    console.log('roles: ', this.roles);
    console.log('country: ', this.country);
  }

  userHasMoreThanOneRole() {
    return this.countryRolesService.userHasMoreThanOneRole();
  }

  initializeCountryRole() {
    this.country = this.countryRolesService.getLocalStorageCountry();

    if (this.countryRolesService.userHasMoreThanOneRole()) {

      this.countryRolesService.countriesAndRolesData().subscribe(value => {
        this.role = this.countryRolesService.getRoleByCountry(this.country as CountryTypes, value);
      });
      return;
    }
    this.countryRolesService.countriesAndRolesData().subscribe(value => {
      this.country = this.countryRolesService.getCountryByRole(this.role as CountryRoleTypes, value);
    });
    this.setCountry();
  }

  chooseWWLogo() {
    this.imageSrc = WWSLogoUrls[this.role];
  }

  setCountry() {
    localStorage.setItem('countryCode', this.country);
  }

  showMatListen(permittedRoles: any[]) {
    for (const permittedRole of permittedRoles) {
      if (this.roles.indexOf(permittedRole) > -1) {
        return true;
      }
    }
  }

  updateCountry() {
    this.setCountry();
    window.location.reload();
  }

  navigationInterceptor(event: RouterEvent): string {
    if (event instanceof NavigationEnd) {
      return event.url;
    }
  }

  sendEmail() {
    // TODO: add new mail
    if (this.role === CountryRoleTypes.WWS) {
      window.location.href = `mailto:${environment.mailForHelp}`;
    } else {
      window.location.href = `mailto:${environment.mailForHelpPM}`;
    }
  }

  navigateBack() {
    this.location.back();
  }

  GetInstrucstivo() {
    if (this.role === CountryRoleTypes.WWS) {
      window.open(environment.instructivo, '_blank');
    } else {
      window.open(environment.instructivoMedical, '_blank');
    }
  }

  GetTerminos() {
    window.open(environment.terminosCondiciones, '_blank');
  }

  ngOnDestroy() {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);

    this.watchRouter.unsubscribe();
  }

  logOut() {
    const Dialog = this.dialog.open(BaseDialogComponent, {
      data: this.dialogOption.logoutConfirmation,
      minWidth: 385,
    });
    // tslint:disable-next-line: deprecation
    Dialog.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.keycloakService.logOut();
      }
    });
  }
}
