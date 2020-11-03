import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styles: []
})
export class DynamicFieldComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() name: string;
  @Input() type: string;
  @Input() label: string;
  @Input() haveRange: string;
  @Input() range: number;
  @Input() rangeEnd: number;
  @Input() dropdown: any[];
  @Input() isRequired: string;

  constructor() { }

  ngOnInit() {
    console.log(this.group, this.name);
  }

}
