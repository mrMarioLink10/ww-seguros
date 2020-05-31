import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests/requests.service';
import { HttpParams } from '@angular/common/http';
import { LifeService } from './new-request/life/services/life.service';
import { DisabilityService } from './new-request/disability/services/disability.service';
import { FormHandlerService } from '../../../core/services/forms/form-handler.service';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../core/services/user/user.service';

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
    { value: 0, view: 'Incompleto' },
    { value: 1, view: 'Completo' },
    { value: 2, view: 'Enviado' },
    { value: 3, view: 'Cancelado' },
    { value: 4, view: 'Adjuntar Expediente' },
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
  role: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private requestsService: RequestsService,
    public life: LifeService,
    public disability: DisabilityService,
    private formHandlerService: FormHandlerService,
    private appComponent: AppComponent,
    private userService: UserService
  ) { }

  getRequests(params: HttpParams = new HttpParams()) {
    let data;
    this.requestsService.getRequests(params)
      .subscribe(res => {
        data = res;
        this.requests = data.data;
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => console.log(err));
  }

  ngOnInit() {
    this.role = this.userService.getRoleCotizador();
    this.getRequests();
  }

  newRequest() {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl('/dashboard/requests/new-requests');
  }

  seeRequest(id: number, type: string) {
    if (this.role === 'WWS') {
      window.open(`https://wwsdevportalbackend.azurewebsites.net/solicitudesView/${type}/${id}/?location=true`, '_blank');
    } else {
      window.open(`https://wwsdevportalbackend.azurewebsites.net/solicitudesView/${type}/${id}/?location=false`, '_blank');
    }
  }

  deleteTargeting(id: number, type: string) {
    switch (type) {
      case 'Vida':
        console.log('Vida');
        this.formHandlerService.deleteRequest(id, 'Solicitudes/vida', 'Vida', this.appComponent);
        break;

      case 'Salud':
        console.log('Salud');
        this.formHandlerService.deleteRequest(id, 'Solicitudes/salud', 'Salud', this.appComponent);
        break;

      case 'Disability':
        console.log('Disability');
        this.formHandlerService.deleteRequest(id, 'Solicitudes/disability', 'Disability', this.appComponent);
        break;

      default:
        break;
    }
    this.getRequests();
  }

  directSendTargeting(id: number, type: string) {
    switch (type) {
      case 'Vida':
        this.formHandlerService.directSendRequest(id, 'Solicitudes/vida', 'Vida', this.appComponent);
        break;

      case 'Salud':
        this.formHandlerService.directSendRequest(id, 'Solicitudes/salud', 'Salud', this.appComponent);
        break;

      case 'Disability':
        this.formHandlerService.directSendRequest(id, 'Solicitudes/disability', 'Disability', this.appComponent);
        break;

      default:
        break;
    }
    this.getRequests();
  }

  navigateToLife(id) {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl(`/dashboard/requests/new-requests/life/${id}`);
  }

  navigateToSalud(id) {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl(`/dashboard/requests/new-requests/major-expenses/${id}`);
  }

  navigateToDisability(id) {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl(`/dashboard/requests/new-requests/disability/${id}`);
  }
}

