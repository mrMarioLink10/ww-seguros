import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Policy, PolicyFilter } from '../../models/policy';
import { Router } from '@angular/router';
import { PolicyService } from '../../../services/consultation/policy.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../../../../../core/services/user/user.service';
import {CountryRolesService} from '../../../../../shared/services/country-roles.service';

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
  styleUrls: ['./policy-table.component.scss']
})
export class PolicyTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  policyFilters: PolicyFilter;
  @Input() set filters(policyFilters: PolicyFilter) {
    if (policyFilters) {
      this.policyFilters = policyFilters;
      this.loadData();
    } else {
      this.policyFilters = {
        id: '',
        clientName: '',
        initialDate: '',
        endDate: '',
        insuranceType: '',
        paymentState: ''
      };
    }
  }

  @Output() pendingPoliciesEmitter = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'clientName', 'product', 'insuredQuantity', 'validityDate',
    'paymentState'];

  dataSource: MatTableDataSource<Policy>;
  data: Policy[] = [];
  loading = false;

  constructor(
    private route: Router,
    private policyService: PolicyService,
    private userService: UserService,
    private countryRolesService: CountryRolesService,
  ) { }

  ngOnInit() {
    console.warn('aqui ocurre el error');

    this.loadData();
  }

  loadData() {
    this.loading = true;
    let params = this.generatePoliciesParams();

    if (this.countryRolesService.userHasMoreThanOneRole()) {
      const country = this.countryRolesService.getLocalStorageCountry();
      params = params.append('country', country.codigoPortal);
    }

    this.policyService.getPolicies(params).subscribe((res: any) => {
      this.data = res.data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.emitPendingPolicies(this.data);
      this.sortTableByPendingPayments();
      this.loading = false;
    });
  }

  sortTableByPendingPayments(): void {
    console.warn('aqui ocurre el error');
    this.sort.sort({ id: 'paymentState', start: 'desc', disableClear: false });
  }

  emitPendingPolicies(policies: Policy[]) {
    const filteredPolicies = policies.filter(p => p.paymentState === 'P');
    this.pendingPoliciesEmitter.emit(filteredPolicies.length);
  }

  generatePoliciesParams(): HttpParams {
    let httpParams = new HttpParams();

    if (this.policyFilters.id && this.policyFilters.id !== '') {
      httpParams = httpParams.append('id', this.policyFilters.id);
    }

    if (this.policyFilters.clientName && this.policyFilters.clientName !== '') {
      httpParams = httpParams.append('clientName', this.policyFilters.clientName);
    }

    if (this.policyFilters.paymentState && this.policyFilters.paymentState !== '') {
      httpParams = httpParams.append('paymentState', this.policyFilters.paymentState);
    }

    if (this.policyFilters.insuranceType && this.policyFilters.insuranceType !== '') {
      httpParams = httpParams.append('insuranceType', this.policyFilters.insuranceType);
    }

    if (this.policyFilters.initialDate && this.policyFilters.initialDate !== '') {
      httpParams = httpParams.append('initianDate', this.policyFilters.initialDate);
    }

    if (this.policyFilters.endDate && this.policyFilters.endDate !== '') {
      httpParams = httpParams.append('endDate', this.policyFilters.endDate);
    }

    return httpParams;
  }

}
