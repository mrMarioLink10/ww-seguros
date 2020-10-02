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
    if (localStorage.getItem('countryCode')) {
      this.country = localStorage.getItem('countryCode');
    } else {
      this.country = 'rd';
      localStorage.setItem('countryCode', this.country);
    }

    this.userName = this.userService.getUserInformation().name;
    this.userEmail = this.userService.getUserInformation().email;
    this.role = this.userService.getRoleCotizador();
    this.roles = this.userService.getRoles();
  }

  setCountry() {
    localStorage.setItem('countryCode', this.country);
    window.location.reload();
  }

  showMatListen(permittedRoles: any[]) {
    for (const permittedRole of permittedRoles) {
      if (this.roles.indexOf(permittedRole) > -1) {
        return true;
      }
    }
  }

  navigationInterceptor(event: RouterEvent): string {
    if (event instanceof NavigationEnd) {
      return event.url;
    }
  }

  sendEmail() {
    if (this.role === 'WWS') {
      window.location.href = `mailto:${environment.mailForHelp}`;
    } else {
      window.location.href = `mailto:${environment.mailForHelpPM}`;
    }
  }

  navigateBack() {
    this.location.back();
  }

  GetInstrucstivo() {
    if (this.role === 'WWS') {
      window.open(environment.instructivo, '_blank');
    } else {
      window.open(environment.instructivoMedical, '_blank');
    }
  }

  GetTerminos() {
    if (this.role === 'WWS') {
      window.open(environment.terminosCondiciones, '_blank');
    } else {
      window.open(environment.terminosCondiciones, '_blank');
    }
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
