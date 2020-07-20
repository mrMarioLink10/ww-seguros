import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {
  @Input() label: string;
  @Input() name: string;
  @Input() min: number;
  @Input() max: number;
  @Input() isMoney?: string;
  @Input() maxInfo?: string;
  @Input() placeholder: string;
  @Input() group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  maxFunction(input, $event, control) {
    if (control.value > this.max) {
      // tslint:disable-next-line: radix
      control.setValue(parseInt(this.max.toString()));
    }
  }
}

