import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EditFieldComponent } from '../components/edit-field/edit-field.component';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      formName: ['', Validators.required],
      formDescription: ['', Validators.required],
      acordeon: this.fb.array([this.addItem('acordeon')]),
    });
  }

  addItem(target: string) {
    switch (target) {
      case 'acordeon':
        return this.fb.group({
          titulo: ['', Validators.required],
          seccion: this.fb.array([this.addItem('seccion')])
        });

      case 'seccion':
        return this.fb.group({
          ancho: ['', Validators.required],
          campos: this.fb.array([this.addItem('field')]),
        });

      case 'field':
        return this.fb.group({
          id: ['', Validators.required],
          name: ['', Validators.required],
          label: ['', Validators.required],
          type: ['', Validators.required],
          isRequired: ['', Validators.required],
          validator: [''],
          range: [''],
          rangeEnd: [''],
          callForm: ['', Validators.required],
          valueForForm: [''],
          DynamicFormInfo: this.fb.group({
            idFormulario: ['']
          }),
          dropdown: this.fb.array([this.addItem('dropDownItem')])
        });

      case 'dropDownItem':
        return this.fb.group({
          value: [''],
          text: [''],
        });
    }
  }

  addField(array: any) {
    array.push(this.addItem('field'));
  }

  getFieldName(field, index) {
    return field.get('label').value !== '' ? field.get('label').value : `Campo ${index + 1}`;
  }

  editFieldParams(field) {
    console.warn('campo:', field);

    let dialog;

    dialog = this.dialog.open(EditFieldComponent, {
      data: field as FormGroup,
      minWidth: 800
    });
  }

  print() {
    console.log(JSON.stringify(this.form.getRawValue()));
  }

}
