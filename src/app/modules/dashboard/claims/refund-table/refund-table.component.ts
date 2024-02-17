import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from '../../../../app.component';
import { HttpParams } from '@angular/common/http';
import { ClaimsService } from '../../services/claims/claims.service';
import { UserService } from '../../../../core/services/user/user.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { RefundService } from './../new-claim/claim-types/refund/services/refund.service';
import { environment } from 'src/environments/environment';
import {CountryRolesService} from '../../../../shared/services/country-roles.service';
import {CountryRoleTypes} from '../../../../shared/utils/keys/country-role-types';


@Component({
  selector: 'app-refund-table',
  templateUrl: './refund-table.component.html',
  styleUrls: ['./refund-table.component.scss']
})
export class RefundTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  BASE_URL: any = `${environment.fileUrl}`;
  refundFilter;
  // @Output() pendingBillsEmitter = new EventEmitter<number>();
  // @Input() policyId;
  role: string;
  @Input() set filters(refundFilter) {
    if (refundFilter) {
      this.refundFilter = refundFilter;
      this.loadData();
    } else {
      this.refundFilter = {
        name: '',
        status: '',
        nroPoliza: '',
        from: '',
        to: '',
      };
    }
  }

  dataSource;
  data = [];
  displayedColumns: string[] = ['noPoliza', 'nombre', 'tipoReclamo', 'totalAmountPesos', 'totalAmount', 'forma', 'userName', 'estatus', 'acciones'];

  constructor(
    private appComponent: AppComponent,
    private claimsService: ClaimsService,
    private userService: UserService, public formHandlerService: FormHandlerService,
    public refund: RefundService,
    private countryRolesService: CountryRolesService, ) { }

  ngOnInit() {
    this.loadData();
    this.role = this.countryRolesService.getLocalStorageCountry().dominio;
  }

  loadData() {
    this.appComponent.showOverlay = true;
    let httpParams = this.constructQueryParams();
    if (this.countryRolesService.userHasMoreThanOneRole()) {
      const country = this.countryRolesService.getLocalStorageCountry();
      httpParams = httpParams.append('country', country.codigoPortal);
    }
    this.claimsService.getRefunds(httpParams).subscribe((res: any) => {
      this.data = res.data || [];
      // console.log(this.policyId);
      console.log(res);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.appComponent.showOverlay = false;
    });
  }

  constructQueryParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.refundFilter.name && this.refundFilter.name !== '') {
      httpParams = httpParams.append('name', this.refundFilter.name.toString());
    }

    if (this.refundFilter.status && this.refundFilter.status !== '') {
      httpParams = httpParams.append('status', this.refundFilter.status.toString());
    }

    if (this.refundFilter.nroPoliza && this.refundFilter.nroPoliza !== '') {
      httpParams = httpParams.append('nroPoliza', this.refundFilter.nroPoliza.toString());
    }

    if (this.refundFilter.from && this.refundFilter.from !== '') {
      httpParams = httpParams.append('from', this.refundFilter.from.toString());
    }

    if (this.refundFilter.to && this.refundFilter.to !== '') {
      httpParams = httpParams.append('to', this.refundFilter.to.toString());
    }

    return httpParams;
  }

  seeRequest(id: number, token: string) {
    const country = this.countryRolesService.getLocalStorageCountry();
    window.open(`${this.BASE_URL}/ReembolsosView/Index/${country.codigoPortal}/${id}/${token}`, '_blank');
  }

  deleteRefund(id: number) {
    this.formHandlerService.deleteRequest(id, 'Reembolsos', 'Reembolso', this.appComponent)
      .subscribe(res => {
        if (res === true) { this.loadData(); }
      });
  }

  directSendRefund(id: number) {
    this.formHandlerService.directSendRequest(id, 'Reembolsos', 'Reembolso', this.appComponent)
      .subscribe(res => {
        if (res === true) { this.loadData(); }
      });

  }

  canDelete(statusId: number): boolean {
    let status = [11,12,13,14];
    return status.includes(statusId);
  }

  canEdit(statusId: number): boolean {
    let status = [3,7,11,12];
    return status.includes(statusId);
  }

  canSend(statusId: number): boolean {
    let status = [3,7,12];
    return status.includes(statusId);
  }

}
