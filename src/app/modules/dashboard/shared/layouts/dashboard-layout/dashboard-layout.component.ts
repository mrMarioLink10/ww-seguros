import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {UserService} from '../../../../../core/services/user/user.service';
import {KeycloakService} from '../../../../../core/services/keycloak/keycloak.service';
import {environment} from 'src/environments/environment';
import {BaseDialogComponent} from 'src/app/shared/components/base-dialog/base-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogOptionService} from 'src/app/core/services/dialog/dialog-option.service';
import {CountryRoleTypes} from '../../../../../shared/utils/keys/country-role-types';
import {CountryRolesService} from '../../../../../shared/services/country-roles.service';
import {CountryTypes} from '../../../../../shared/utils/keys/country-types';
import {WWSLogoUrls} from './keys/WWS-logo-urls';
import {ICountryRole} from '../../../../../shared/utils/interfaces/country-role.interface';

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
  roles: any;
  countryRole: ICountryRole;
  countryRoles: ICountryRole[];
  imageSrc: string = WWSLogoUrls.RD;
  watchRouter: Subscription;
  role: string;

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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.initializeCountryRole();

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
  }

  userHasMoreThanOneRole() {
    return this.countryRolesService.userHasMoreThanOneRole();
  }

  initializeCountryRole() {
    this.countryRolesService.countriesAndRolesData().subscribe(value => {
      this.countryRoles = value;
      this.countryRole = this.countryRolesService.getLocalStorageCountry();

      if (!this.countryRole) {
        this.countryRolesService.setCountryRole(this.countryRoles[0]);
        this.countryRole = this.countryRolesService.getLocalStorageCountry();
      }
      this.role = this.countryRole.dominio;

      console.log('country role: ', this.countryRole);
      this.chooseWWLogo(this.countryRole.dominio);
    });
  }

  chooseWWLogo(role) {
    this.imageSrc = role === CountryRoleTypes.WWS ? WWSLogoUrls.RD : WWSLogoUrls.OTHER;
  }

  showMatListen(permittedRoles: any[]) {
    for (const permittedRole of permittedRoles) {
      if (this.roles.indexOf(permittedRole) > -1) {
        return true;
      }
    }
  }

  setCountry(countryRole: ICountryRole) {
    this.countryRolesService.setCountryRole(countryRole);
  }

  updateCountry(countryRole: ICountryRole) {
    console.log('selection change', countryRole);
    this.countryRole = countryRole;
    this.setCountry(countryRole);
    window.location.reload();
  }

  navigationInterceptor(event: RouterEvent): string {
    if (event instanceof NavigationEnd) {
      return event.url;
    }
  }

  sendEmail() {
    // TODO: add new mail
    if (this.countryRole.dominio === CountryRoleTypes.WWS) {
      window.location.href = `mailto:${environment.mailForHelp}`;
    } else {
      window.location.href = `mailto:${environment.mailForHelpPM}`;
    }
  }

  navigateBack() {
    this.location.back();
  }

  GetInstrucstivo() {
    if (this.countryRole.dominio === CountryRoleTypes.WWS) {
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
