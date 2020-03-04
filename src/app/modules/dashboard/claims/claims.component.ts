import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  newClaimButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nuevo Reclamo',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    customClass: 'dashboard-button'
  };

  constructor() { }

  ngOnInit() {
  }

  newClaim(){
    this.newClaimButtonOptions.active = true;
    setTimeout(() => {
      this.newClaimButtonOptions.active = false;

    }, 3500);
  }
}
