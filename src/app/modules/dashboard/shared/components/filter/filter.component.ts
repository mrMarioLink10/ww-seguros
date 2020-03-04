import { Component, OnInit, Input } from '@angular/core';
import { MatFormField } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() status: [];

  constructor() { }

  ngOnInit() {
    console.log(status);

  }

}
