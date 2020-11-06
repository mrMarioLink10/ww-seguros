import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldConfig } from '../models/field-config';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styles: []
})
export class CheckboxComponent implements OnInit {

  @Input() options: FieldConfig;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label: string;

  @Output() selected = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.options.name) {
      this.name = this.options.name;
    }
  }

  emitter(event) {
    this.selected.emit({ valor: event.value, name: this.name });
  }


}
