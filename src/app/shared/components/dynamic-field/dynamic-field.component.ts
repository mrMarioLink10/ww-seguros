import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../form-components/models/field-config';

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
  @Input() validator: string;
  @Input() haveRange: string;
  @Input() isEnable: string;
  @Input() defaultValue: string;
  @Input() range: number;
  @Input() rangeEnd: number;
  @Input() values: any[];
  @Input() isRequired: string;
  options: FieldConfig = { options: [] };
  constructor() { }

  ngOnInit() {

    if (this.values.length > 0) {
      for (const iterator of this.values) {
        console.log('iterator', iterator);
        this.options.options.push({ value: iterator.value, viewValue: iterator.viewValue });
      }
    }

    if (this.isEnable === 'DESHABILITADO') {
      this.group.get(this.name).disable();
      this.group.get(this.name).setValue(this.defaultValue);
    }

    if (this.isRequired === 'NO OBLIGATORIO') {
      this.group.get(this.name).setValidators(null);
    }

    if (this.validator === 'SI' && this.type === 'TEXTO') {
      console.log('SOY EMAIL')
      this.group.get(this.name).setValidators([Validators.email]);
    }
  }

}
