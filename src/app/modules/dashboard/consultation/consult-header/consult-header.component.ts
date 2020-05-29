import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-consult-header',
  templateUrl: './consult-header.component.html',
  styleUrls: ['./consult-header.component.scss']
})
export class ConsultHeaderComponent implements OnInit {
  pendingPolicies = 2;

  constructor() { }

  ngOnInit() {
  }

}
