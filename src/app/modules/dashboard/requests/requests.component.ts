import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  newRequestButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nueva Solicitud',
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

  newRequest(){
    this.newRequestButtonOptions.active = true;
    setTimeout(() => {
      this.newRequestButtonOptions.active = false;

    }, 3500);
  }

}
