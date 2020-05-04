import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { QuotesService } from '../services/quotes/quotes.service';
import { HttpParams } from '@angular/common/http';

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
    'Enviado',
    'Por Enviar'
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

  displayedColumns: string[] = ['no', 'nombre', 'dependientes', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];
  dataSource;

  quotes: any[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _quotesService: QuotesService,
  ) { }

  getQuotes(params: HttpParams = new HttpParams) {
    let data;
    this._quotesService.getQuotes(params)
      .subscribe(res => {
        data = res;
        this.quotes = data.data;
        this.dataSource = new MatTableDataSource(this.quotes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => console.log(err));
  }

  ngOnInit() {
    this.getQuotes();
  }

  newQuote() {
    window.open('https://cotizadores.wwseguros.com.do/', '_blank');
  }

}
