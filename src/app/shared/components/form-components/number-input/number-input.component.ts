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
  @Input() min: string;
  @Input() max: string;
  @Input() isMoney?: string;
  @Input() placeholder: string;
  @Input() group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
