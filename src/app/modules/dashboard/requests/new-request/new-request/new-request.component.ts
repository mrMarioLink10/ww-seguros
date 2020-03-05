import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  requestType = [
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos'
    },
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos'
    },
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
