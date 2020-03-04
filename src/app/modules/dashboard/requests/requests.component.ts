import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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
  {no: 986543, nombre: 'Danilo Medina', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 666420, nombre: 'El Penco', dependientes: 1, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 154546, nombre: 'Isai Vargas', dependientes: 2, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 213214, nombre: 'Huncho Quavo', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 123333, nombre: 'LeBron James', dependientes: 2, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Completar'},
  {no: 768678, nombre: 'Giannis Qwerty', dependientes: 0, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 656675, nombre: 'Jim Carrey', dependientes: 3, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Completar'},
  {no: 986543, nombre: 'Danilo Medina', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 666420, nombre: 'El Penco', dependientes: 1, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Adjuntar Expediente'},
  {no: 123333, nombre: 'LeBron James', dependientes: 2, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Completar'},
  {no: 768678, nombre: 'Giannis Qwerty', dependientes: 0, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Adjuntar Expediente'},
  {no: 656675, nombre: 'Jim Carrey', dependientes: 3, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Por Completar'},
  {no: 986543, nombre: 'Danilo Medina', dependientes: 1, seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 666420, nombre: 'El Penco', dependientes: 1, seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
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

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  newRequest(){
    this.newRequestButtonOptions.active = true;
    setTimeout(() => {
      this.newRequestButtonOptions.active = false;

    }, 3500);
  }

}

