import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

export interface Requests {
  no: number;
  nombre: string;
  dependientes: number;
  seguro: string;
  plan: string;
  fecha: Date;
  monto: number;
  estatus: string;

}

const ELEMENT_DATA: Requests[] = [
  // tslint:disable: max-line-length
  { no: 986543, nombre: 'Danilo Antonio', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado' },
  { no: 154546, nombre: 'Isai Vargas', dependientes: 2, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado' },
  { no: 213214, nombre: 'Kentavious Caldwell', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado' },
  { no: 123333, nombre: 'LeBron James', dependientes: 2, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Completar' },
  { no: 656675, nombre: 'Jim Carrey', dependientes: 3, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Completar' },
];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  statusTypes = [
    'Enviado',
    'Por Completar',
    'Adjuntar Expediente'
  ];

  newRequestButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nueva Solicitud',
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

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  newRequest() {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl('/dashboard/requests/new-requests');
  }

}

