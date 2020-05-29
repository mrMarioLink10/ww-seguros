import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Policy, PolicyFilter} from '../../models/policy';

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
  styleUrls: ['./policy-table.component.scss']
})
export class PolicyTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  policyFilters: PolicyFilter;
  @Input() set filters(policyFilters: PolicyFilter) {
    this.policyFilters = policyFilters;
  }

  sortByPendingPayments = false;

  displayedColumns: string[] = ['id', 'clientName', 'product', 'insuredQuantity', 'validityDate',
    'paymentState', 'totalBalance'];

    dataSource;
    data: Policy[] = [
    {id: 1233, clientName: 'Isaí Vargas', product: 'vida', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    {id: 4567, clientName: 'Alam Alcántara', product: 'salud', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 7500},
    {id: 8910, clientName: 'Jean Carlos Pérez', product: 'vida', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pendiente', totalBalance: 15000},
    {id: 1112, clientName: 'Jodir Jimenez', product: 'vida', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    {id: 1314, clientName: 'Oscar López', product: 'vida', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    {id: 1516, clientName: 'Manuel Montero', product: 'salud', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pendiente', totalBalance: 7500},
    {id: 1617, clientName: 'Jeremy Cruz', product: 'salud', insuredQuantity: 4, validityDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    ];

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortTableByPendingPayments(): void {
    this.sort.sort({ id: 'paymentState', start: 'desc', disableClear: false });
  }

}
