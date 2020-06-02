import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../core/services/user/user.service';

@Component({
  selector: 'app-consult-header',
  templateUrl: './consult-header.component.html',
  styleUrls: ['./consult-header.component.scss']
})
export class ConsultHeaderComponent implements OnInit {

  @Output() activeTab = new EventEmitter<number>();
  userName: string;
  userEmail: string;

  pendingPolicies = 0;
  @Input() set _pendingPolicies(pendingPolicies: number) {
    this.pendingPolicies = pendingPolicies;
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userName = this.userService.getUserInformation().name;
    this.userEmail = this.userService.getUserInformation().email;
  }

  activatePolicyTab() {
    this.activeTab.emit(0);
  }

}
