import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyAdministrationService } from '../policy-administration/services/policy-administration.service';
import { LifeService } from '../requests/new-request/life/services/life.service';
import { DisabilityService } from '../requests/new-request/disability/services/disability.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { DynamicPaService } from './services/dynamic-pa.service';

@Component({
  selector: 'app-dynamic-pa',
  templateUrl: './dynamic-pa.component.html',
  styleUrls: ['./dynamic-pa.component.scss'],
})
export class DynamicPaComponent implements OnInit {
  constructor(
    private router: Router,
    private dynamicPaService: DynamicPaService,
    public life: LifeService,
    public disability: DisabilityService,
    private formHandlerService: FormHandlerService,
    private appComponent: AppComponent,
    private userService: UserService
  ) { }

  // statusTypes = [
  //   { value: 0, view: 'Revisar' },
  //   { value: 1, view: 'En revisión' },
  //   { value: 2, view: 'Aceptada' },
  // ];

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
    fillType: this.fillType,
  };

  newRequestButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Cotizar',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    customClass: 'dashboard-button',
  };

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    'id',
    'poliza',
    'ramo',
    'nombre',
    'creationDate',
    'createdBy',
    'status',
    'acciones',
  ];

  dataSource;
  requests: any;
  role: any;

  loading = false;
  isWWSeguros = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  BASE_URL: any = `${environment.fileUrl}`;

  getRequests(params: HttpParams = new HttpParams()) {
    let data;

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      params = params.append('country', localStorage.getItem('countryCode'));
    }

    this.loading = true;

    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    this.dynamicPaService.getRequests(params).subscribe(
      (res) => {
        this.appComponent.showOverlay = false;

        data = res;
        console.log(data);
        this.requests = data.data;
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }, (err) => console.log(err)
    );
  }

  ngOnInit() {
    if (this.userService.getRoles().includes('wws_intermediario_admin')) {
      this.isWWSeguros = true;
    }

    this.role = this.userService.getRoleCotizador();
    this.getRequests();
  }

  newRequest() {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl('/dashboard/dynamic-pa/quote');
  }

  editRequest(guid: string) {
    this.router.navigate([`../dashboard/dynamic-pa/edit`, { guid }]);
  }

  confirmRequest(id: number) {
    this.formHandlerService.directSendRequest(id, 'FlujoClientesExistenteDinamico', 'Solicitud de Cambio', this.appComponent)
      .subscribe(res => {
        console.log(res);
        if (res === true) { this.getRequests(); }
      });
  }

  rejectRequest(id: number) {
    this.formHandlerService.policyAdministration(id, 'deny', this.appComponent);
  }
}
