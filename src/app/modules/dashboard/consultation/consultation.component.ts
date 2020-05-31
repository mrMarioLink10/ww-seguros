import { Component, OnInit } from '@angular/core';
import {PolicyFilter} from './models/policy';
import {BillFilter} from './models/bill';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  policyFilters: PolicyFilter;
  billsFilter: BillFilter;
  activeTab = 0;
  pendingPolicies = 0;

  constructor() { }

  ngOnInit() {
  }

  setPolicyFilters(event) {
    this.policyFilters = event;
  }

  setBillsFilters(event) {
    this.billsFilter = event;
  }

  setActiveTab(event) {
    this.activeTab = event;
  }

  setPendingPolicies(event) {
    this.pendingPolicies = event;
  }

}
