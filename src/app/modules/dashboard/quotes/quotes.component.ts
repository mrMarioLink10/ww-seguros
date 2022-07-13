import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { QuotesService } from '../services/quotes/quotes.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../../../core/services/user/user.service';
import { AppComponent } from '../../../app.component';
import { environment } from 'src/environments/environment';
import {CountryRolesService} from '../../../shared/services/country-roles.service';
import {CountryTypes} from '../../../shared/utils/keys/country-types';
import {CiaCountryRoleTypes} from '../../../shared/utils/keys/cia-country-role-types';

export interface Quotes {
  noCotizacion: number;
  nombre: string;
  dependientes: number;
  seguro: string;
  plan: string;
  fecha: Date;
  monto: number;
  estatus: string;

}

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})

// tslint:disable: max-line-length
export class QuotesComponent implements OnInit {

  statusTypes = [
    { value: 2, view: 'Enviado' },
    { value: 5, view: 'Por Enviar' },
  ];

  fillType = 'tipoSeguro';

  fills = {
    status: this.statusTypes,
    fillType: this.fillType
  };

  newQuoteButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nueva Cotización',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    customClass: 'dashboard-button'
  };

  displayedColumns: string[] = ['noCotizacion', 'nombre', 'edad', 'tipoSeguro', 'plan', 'fecha', 'monto', 'idBroker', 'estatus', 'acciones'];
  dataSource;

  quotes: any[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private quotesService: QuotesService,
    private userService: UserService,
    private appComponent: AppComponent,
    private countryRolesService: CountryRolesService,
  ) { }

  getQuotes(params: HttpParams = new HttpParams()) {
    let data;
    console.log(params);

    if (this.countryRolesService.userHasMoreThanOneRole()) {
      params = params.append('country', localStorage.getItem('countryCode'));
    }

    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    this.quotesService.getQuotes(params)
      .subscribe(res => {
        data = res;
        this.quotes = data.data;
        this.dataSource = new MatTableDataSource(this.quotes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.appComponent.showOverlay = false;
      }, err => console.log(err));
  }

  ngOnInit() {
    this.getQuotes();
  }

  navigateToLife(id) {
    this.router.navigateByUrl(`/dashboard/requests/new-requests/vida/cotizacion/${id}`);
  }

  navigateToSalud(id) {
    this.router.navigateByUrl(`/dashboard/requests/new-requests/salud/cotizacion/${id}`);
  }

  navigateToSaludPdf(id) {
    window.open(`${environment.urlCotizadoresPdf}/salud/cotizacion-${id}.pdf`, '_blank');

  }
  navigateToLifePdf(id) {
    window.open(`${environment.urlCotizadoresPdf}/tmp/cotizacion-${id}.pdf`, '_blank');

  }

  newQuote() {
    let role = '';
    let cia = '';

    if (this.countryRolesService.userHasMoreThanOneRole()) {
      const country = this.countryRolesService.getLocalStorageCountry();

      this.countryRolesService.countriesAndRolesData().subscribe(value => {
        role = this.countryRolesService.getRoleByCountry(country as CountryTypes, value);
        cia = this.countryRolesService.getCiaByRole(role, value);
      });

    } else {
      role = this.userService.getRoleCotizador();
    }
    window.open(`${environment.urlCotizadores}/?cia=${cia}`, '_blank');
  }

}
