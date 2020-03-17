import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input() title: string;
  @Input() options: FieldConfig;
  @Input() name: string;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
