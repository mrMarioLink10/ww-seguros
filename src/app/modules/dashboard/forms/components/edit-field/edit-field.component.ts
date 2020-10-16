import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { BaseDialog } from 'src/app/shared/components/base-dialog/models/base-dialog';
import { FieldConfig } from '../../../../../shared/components/form-components/models/field-config';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { FormBuilder } from '@angular/forms';

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
    this.data.get('validator').reset();
    this.data.get('range').reset();
    this.data.get('rangeEnd').reset();
    this.data.get('valueForForm').reset();
    this.data.get('dropdown').reset();

    if (value !== 'callForm') {
      this.data.get('callForm').reset();
    }
  }

  getValidatorTitle(value) {
    return value === 'TEXTO' ? '¿Validar como email?' : value === 'NUMERICO' ? '¿Es un telefono?' : null;
  }

  addItem(target: string) {
    switch (target) {
      case 'dropDownItem':
        return this.fb.group({
          value: [''],
          text: [''],
        });
    }
  }

}
