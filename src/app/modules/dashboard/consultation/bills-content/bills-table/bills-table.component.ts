import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Bill, BillFilter} from '../../models/bill';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.scss']
})
export class BillsTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  billsFilter: BillFilter;
  @Input() set filters(billsFilter: BillFilter) {
    this.billsFilter = billsFilter;
  }

  dataSource;
  data: Bill[] = [
    {policyId: 1233, billId: 1234, clientName: 'Isaí Vargas', expirationDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    {policyId: 4567, billId: 1234, clientName: 'Alam Alcántara', expirationDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 7500},
    {policyId: 8910, billId: 1234, clientName: 'Jean Carlos Pérez', expirationDate: '15/05/2020', paymentState: 'Pendiente', totalBalance: 15000},
    {policyId: 1112, billId: 1234, clientName: 'Jodir Jimenez', expirationDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    {policyId: 1314, billId: 1234, clientName: 'Oscar López', expirationDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
    {policyId: 1516, billId: 1234, clientName: 'Manuel Montero', expirationDate: '15/05/2020', paymentState: 'Pendiente', totalBalance: 7500},
    {policyId: 1617, billId: 1234, clientName: 'Jeremy Cruz', expirationDate: '15/05/2020', paymentState: 'Pagado', totalBalance: 15000},
  ];

  displayedColumns: string[] = ['policyId', 'billId' , 'clientName', 'expirationDate', 'paymentState', 'totalBalance', 'actions'];

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
