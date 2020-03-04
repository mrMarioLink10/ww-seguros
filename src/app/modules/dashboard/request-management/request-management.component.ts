import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';



export interface PeriodicElement {
  no: number;
  nombre: string;
  seguro: string;
  fecha: Date;
  estatus: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 154546, nombre: 'Isai Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 223423, nombre: 'Robert Rivera', seguro: 'Vida', fecha: new Date(), estatus: 'Pendiente'},
  {no: 987687, nombre: 'David Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 445645, nombre: 'Isai Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 532423, nombre: 'Robert Julio Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 654374, nombre: 'David Antigua', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 723421, nombre: 'Jorge Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 822333, nombre: 'Petronila Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 900023, nombre: 'David Antigua', seguro: 'Vida', fecha: new Date(), estatus: 'Recibido'},
  {no: 100069, nombre: 'Huncho Rivera', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 154546, nombre: 'Isai Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 223423, nombre: 'Robert Rivera', seguro: 'Vida', fecha: new Date(), estatus: 'Pendiente'},
  {no: 987687, nombre: 'David Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 445645, nombre: 'Isai Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 532423, nombre: 'Robert Julio Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 654374, nombre: 'David Antigua', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 723421, nombre: 'Jorge Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 822333, nombre: 'Petronila Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 900023, nombre: 'David Antigua', seguro: 'Vida', fecha: new Date(), estatus: 'Recibido'},
  {no: 100069, nombre: 'Huncho Rivera', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 154546, nombre: 'Isai Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 223423, nombre: 'Robert Rivera', seguro: 'Vida', fecha: new Date(), estatus: 'Pendiente'},
  {no: 987687, nombre: 'David Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 445645, nombre: 'Isai Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 532423, nombre: 'Robert Julio Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 654374, nombre: 'David Antigua', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 723421, nombre: 'Jorge Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 822333, nombre: 'Petronila Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 900023, nombre: 'David Antigua', seguro: 'Vida', fecha: new Date(), estatus: 'Recibido'},
  {no: 100069, nombre: 'Huncho Rivera', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 154546, nombre: 'Isai Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 223423, nombre: 'Robert Rivera', seguro: 'Vida', fecha: new Date(), estatus: 'Pendiente'},
  {no: 987687, nombre: 'David Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 445645, nombre: 'Isai Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 532423, nombre: 'Robert Julio Perez', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 654374, nombre: 'David Antigua', seguro: 'Salud', fecha: new Date(), estatus: 'Aprobado'},
  {no: 723421, nombre: 'Jorge Vargas', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
  {no: 822333, nombre: 'Petronila Vargas', seguro: 'Vida', fecha: new Date(), estatus: 'Aprobado'},
  {no: 900023, nombre: 'David Antigua', seguro: 'Vida', fecha: new Date(), estatus: 'Recibido'},
  {no: 100069, nombre: 'Huncho Rivera', seguro: 'Salud', fecha: new Date(), estatus: 'Rechazado'},
];

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss']
})

export class RequestManagementComponent implements OnInit {


  displayedColumns: string[] = ['no', 'nombre', 'seguro', 'fecha', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

}
