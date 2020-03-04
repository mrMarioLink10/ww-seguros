import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  newQuoteButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nueva Cotización',
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

  newQuote(){
    this.newQuoteButtonOptions.active = true;
    setTimeout(() => {
      this.newQuoteButtonOptions.active = false;

    }, 3500);
  }

}
