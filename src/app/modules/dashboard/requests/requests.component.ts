import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests/requests.service';
import { HttpParams } from '@angular/common/http';

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

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  statusTypes = [
    'Enviado',
    'Incompleto',
    'Completo',
    'Cancelado',
    'Adjuntar Expediente'
  ];

  fillType = 'tipoSeguro';

  fills = {
    status: this.statusTypes,
    fillType: this.fillType
  };


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

  displayedColumns: string[] = ['no', 'nombre', 'apellidos', 'dependientes', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];

  dataSource;
  requests: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private _requestsService: RequestsService) { }

  getRequests(params: HttpParams = new HttpParams) {
    let data;
    this._requestsService.getRequests(params)
      .subscribe(res => {
        data = res;
        this.requests = data.data;
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => console.log(err));
  }

  ngOnInit() {
    this.getRequests();
  }

  newRequest() {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl('/dashboard/requests/new-requests');
  }

}

