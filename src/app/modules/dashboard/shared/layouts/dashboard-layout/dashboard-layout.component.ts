import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UserService } from '../../../../../core/services/user/user.service';
import { KeycloakService } from '../../../../../core/services/keycloak/keycloak.service';

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
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.watchRouter = router.events.subscribe((url: any) => {
      this.activeRoute = url.url;
    });
  }

  ngOnInit() {
    this.userName = this.userService.getUserInformation().name;
    this.userEmail = this.userService.getUserInformation().email;

  }

  navigateBack() {
    // this.location.back();
  }

  ngOnDestroy() {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);

    this.watchRouter.unsubscribe();
  }
}
