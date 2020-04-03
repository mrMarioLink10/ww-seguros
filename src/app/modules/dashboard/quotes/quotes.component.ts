import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


export interface Quotes {
  no: number;
  nombre: string;
  dependientes: number;
  seguro: string;
  plan: string;
  fecha: Date;
  monto: number;
  estatus: string;

}

const ELEMENT_DATA: Quotes[] = [
  // tslint:disable: max-line-length
  { no: 154546, nombre: 'Isai Vargas', dependientes: 2, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado' },
  { no: 213214, nombre: 'David Antonio', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado' },
  { no: 123333, nombre: 'LeBron James', dependientes: 2, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Enviar' },
  { no: 768678, nombre: 'Giannis Akumpo', dependientes: 0, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado' },
  { no: 656675, nombre: 'Jim Carrey', dependientes: 3, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Enviar' },

];

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
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  newQuote() {
    this.newQuoteButtonOptions.active = true;
    setTimeout(() => {
      this.newQuoteButtonOptions.active = false;

    }, 3500);
  }

}
