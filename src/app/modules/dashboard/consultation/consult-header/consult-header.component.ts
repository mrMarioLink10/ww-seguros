import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-consult-header',
  templateUrl: './consult-header.component.html',
  styleUrls: ['./consult-header.component.scss']
})
export class ConsultHeaderComponent implements OnInit {
  pendingPolicies = 2;

  @Output() activeTab = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  activatePolicyTab() {
    this.activeTab.emit(0);
  }

}
