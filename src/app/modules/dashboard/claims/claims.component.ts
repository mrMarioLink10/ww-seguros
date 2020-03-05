import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

export interface Claims {
  no: number;
  nombre: string;
  seguro: string;
  plan: string;
  fecha: Date;
  monto: number;
  estatus: string;

}

const ELEMENT_DATA: Claims[] = [
  // tslint:disable: max-line-length
  {no: 986543, nombre: 'Danilo Medina', seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Denegado'},
  {no: 666420, nombre: 'El Penco', seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 154546, nombre: 'Isai Vargas', seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Reembolsado'},
  {no: 213214, nombre: 'Huncho Quavo', seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 768678, nombre: 'Giannis Qwerty', seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
  {no: 986543, nombre: 'Danilo Medina', seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Reembolsado'},
  {no: 986543, nombre: 'Danilo Medina', seguro: 'Salud', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Reembolsado'},
  {no: 666420, nombre: 'El Penco', seguro: 'Vida', plan: 'Nombre del Plan', fecha: new Date(), monto: 2000, estatus: 'Enviado'},
];

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  statusTypes = [
    'Enviado',
    'Reembolsado',
    'Denegado'
  ];

  newClaimButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nuevo Reclamo',
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

  displayedColumns: string[] = ['no', 'nombre', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  newClaim() {
    this.newClaimButtonOptions.active = true;

    this.route.navigateByUrl('/dashboard/claims/new-claim');
  }
}
