import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { QuotesService } from '../services/quotes/quotes.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../../../core/services/user/user.service';
import { AppComponent } from '../../../app.component';

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

  displayedColumns: string[] = ['noCotizacion', 'nombre', 'tipoSeguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];
  dataSource;

  quotes: any[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private quotesService: QuotesService,
    private userService: UserService,
    private appComponent: AppComponent
  ) { }

  getQuotes(params: HttpParams = new HttpParams()) {
    let data;
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
    this.router.navigateByUrl(`/dashboard/requests/new-requests/life/cotizacion/${id}`);
  }
  navigateToSalud(id) {
    this.router.navigateByUrl(`/dashboard/requests/new-requests/major-expenses/cotizacion/${id}`);
  }
  newQuote() {
    if (this.userService.getRoleCotizador() === 'WWS') {
      window.open('https://cotizadores.wwseguros.com.do/?cia=wws', '_blank');
    } else if (this.userService.getRoleCotizador() === 'WMA') {
      window.open('https://cotizadores.wwseguros.com.do/?cia=wwm', '_blank');
    }
  }

}
