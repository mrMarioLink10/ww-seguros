import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AppComponent } from 'src/app/app.component';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { environment } from 'src/environments/environment';
import { DisabilityService } from '../requests/new-request/disability/services/disability.service';
import { LifeService } from '../requests/new-request/life/services/life.service';
import { RequestsService } from '../services/requests/requests.service';

@Component({
  selector: 'app-pa-requests',
  templateUrl: './pa-requests.component.html',
  styleUrls: ['./pa-requests.component.scss']
})
export class PaRequestsComponent implements OnInit {

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
  displayedColumns: string[] = ['noCotizacion', 'nombres', 'apellidos', 'seguro', 'plan', 'fecha', 'monto', 'createdBy', 'estatus', 'acciones'];

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

  }

  deleteTargeting(id: number, type: string) {

  }

  directSendTargeting(id: number, type: string) {

  }
}
