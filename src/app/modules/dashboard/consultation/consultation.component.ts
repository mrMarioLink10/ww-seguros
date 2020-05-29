import { Component, OnInit } from '@angular/core';
import {PolicyFilter} from './models/policy';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  policyFilters: PolicyFilter;

  constructor() { }

  ngOnInit() {
  }

  setPolicyFilters(event) {
    this.policyFilters = event;
  }

}
