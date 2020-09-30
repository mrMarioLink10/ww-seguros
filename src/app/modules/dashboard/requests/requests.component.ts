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
import { environment } from 'src/environments/environment';

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

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['noCotizacion', 'nombres', 'apellidos', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];

  dataSource;
  requests: any;
  role: any;

  loading = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private requestsService: RequestsService,
    public life: LifeService,
    public disability: DisabilityService,
    private formHandlerService: FormHandlerService,
    private appComponent: AppComponent,
    private userService: UserService,
  ) { }

  getRequests(params: HttpParams = new HttpParams()) {
    let data;

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      params = params.append('country', localStorage.getItem('countryCode'));
    }

    this.loading = true;

    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    this.requestsService.getRequests(params)
      .subscribe(res => {
        this.appComponent.showOverlay = false;

        data = res;
        this.requests = data.data;
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;

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
  BASE_URL: any = `${environment.fileUrl}`;
  seeRequest(id: number, type: string) {
    if (this.role === 'WWS') {
      window.open(`${this.BASE_URL}/solicitudesView/${type}/${id}/?location=true`, '_blank');
    } else {
      window.open(`${this.BASE_URL}/solicitudesView/${type}/${id}/?location=false`, '_blank');
    }
  }

  deleteTargeting(id: number, type: string) {
    switch (type) {
      case 'Vida':
        console.log('Vida');
        this.formHandlerService.deleteRequest(id, 'Solicitudes/vida', 'Vida', this.appComponent)
          .subscribe(res => {
            console.log(res);
            if (res === true) { this.getRequests(); }
          });
        break;

      case 'Salud':
        console.log('Salud');
        this.formHandlerService.deleteRequest(id, 'Solicitudes/salud', 'Salud', this.appComponent)
          .subscribe(res => {
            console.log(res);
            if (res === true) { this.getRequests(); }
          });
        break;

      case 'Disability':
        console.log('Disability');
        this.formHandlerService.deleteRequest(id, 'Solicitudes/disability', 'Disability', this.appComponent)
          .subscribe(res => {
            if (res === true) { this.getRequests(); }
          });
        break;

      default:
        break;
    }
  }

  directSendTargeting(id: number, type: string) {
    switch (type) {
      case 'Vida':
        this.formHandlerService.directSendRequest(id, 'Solicitudes/vida', 'Vida', this.appComponent)
          .subscribe(res => {
            console.log(res);
            if (res === true) { this.getRequests(); }
          });
        break;

      case 'Salud':
        this.formHandlerService.directSendRequest(id, 'Solicitudes/salud', 'Salud', this.appComponent)
          .subscribe(res => {
            console.log(res);
            if (res === true) { this.getRequests(); }
          });
        break;

      case 'Disability':
        this.formHandlerService.directSendRequest(id, 'Solicitudes/disability', 'Disability', this.appComponent)
          .subscribe(res => {
            console.log(res);
            if (res === true) { this.getRequests(); }
          });
        break;

      default:
        break;
    }
  }

  navigateToLife(id) {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl(`/dashboard/requests/new-requests/vida/${id}`);
  }

  navigateToSalud(id) {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl(`/dashboard/requests/new-requests/salud/${id}`);
  }

  navigateToDisability(id) {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl(`/dashboard/requests/new-requests/disability/${id}`);
  }
}

