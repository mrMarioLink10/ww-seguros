import { Component, OnInit } from '@angular/core';
import { PolicyFilter } from './models/policy';
import { BillFilter } from './models/bill';
import { UserService } from '../../../core/services/user/user.service';

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
  roles;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.roles = this.userService.getRoles();
  }

  setPolicyFilters(event) {
    this.policyFilters = event;
  }

  setBillsFilters(event) {
    this.billsFilter = event;
  }

  setActiveTab(event) {
    this.activeTab = event;
    console.log(this.activeTab);
  }

  setPendingPolicies(event) {
    this.pendingPolicies = event;
  }

  roleLetShow(permittedRoles: any[]) {
    for (const permittedRole of permittedRoles) {
      if (this.roles.indexOf(permittedRole) > -1) {
        return true;
      }
    }
  }

}
