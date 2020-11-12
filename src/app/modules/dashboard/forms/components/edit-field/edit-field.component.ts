import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FieldConfig } from '../../../../../shared/components/form-components/models/field-config';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styles: []
})
// tslint:disable: forin
export class EditFieldComponent implements OnInit {

  type: FieldConfig = {
    label: 'Tipo de campo',
    name: 'type',
    options: [
      {
        value: 'TEXTO',
        viewValue: 'Texto'
      },
      {
        value: 'NUMERICO',
        viewValue: 'Numerico'
      },
      {
        value: 'FECHA',
        viewValue: 'Fecha'
      },
      {
        value: 'DROPDOWN',
        viewValue: 'Dropdown'
      },
      {
        value: 'CHECKBOX',
        viewValue: 'Checkbox'
      },
      {
        value: 'RADIO BUTTON',
        viewValue: 'Radio button'
      },
    ]
  };

  required: FieldConfig = {
    label: '¿Es requerido?',
    name: 'isRequired',
    options: [
      {
        value: 'OBLIGATORIO',
        viewValue: 'Obligatorio'
      },
      {
        value: 'NO OBLIGATORIO',
        viewValue: 'No obligatorio'
      },
    ]
  };

  enable: FieldConfig = {
    label: 'Estatus por default del campo',
    name: 'isEnable',
    options: [
      {
        value: 'HABILITADO',
        viewValue: 'Habilitado'
      },
      {
        value: 'DESHABILITADO',
        viewValue: 'Deshabilitado'
      },
    ]
  };

  validator: FieldConfig = {
    label: '¿Es requerido?',
    name: 'validator',
  };

  constructor(
    public dialogRef: MatDialogRef<EditFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public diseaseService: DiseaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkRangeStatus(value?) {
    this.trueReset(this.data.get('validator'), '');
    this.trueReset(this.data.get('haveRange'), '');
    this.trueReset(this.data.get('range'), 0);
    this.trueReset(this.data.get('rangeEnd'), 0);
    this.trueReset(this.data.get('valueForForm'), '');
    this.trueReset(this.data.get('dropdown'), [{ value: '', viewValue: '' }]);

    if (value !== 'callForm') {
      this.trueReset(this.data.get('callForm'), '');
    }
  }

  trueReset(field: FormControl, valueToSet: any) {
    field.reset();
    field.setValue(valueToSet);
  }

  getValidatorTitle(value) {
    return value === 'TEXTO' ? '¿Validar como email?' : value === 'NUMERICO' ? '¿Es un telefono?' : null;
  }

  addItem(target: string) {
    switch (target) {
      case 'dropDownItem':
        return this.fb.group({
          value: [''],
          viewValue: [''],
        });
    }
  }

}
