import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { EditFieldComponent } from '../components/edit-field/edit-field.component';
import { DialogOptionService } from '../../../../core/services/dialog/dialog-option.service';
import { FormHandlerService } from '../../../../core/services/forms/form-handler.service';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {

  form: FormGroup;
  showContent = true;

  @ViewChild('fakeForm', { static: false }) fakeForm;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogOption: DialogOptionService,
    private formHandler: FormHandlerService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      formName: ['', Validators.required],
      formDescription: ['', Validators.required],
      isComplete: [false, Validators.required],
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
          name: ['', Validators.required],
          label: ['', Validators.required],
          type: ['', Validators.required],
          isRequired: ['', Validators.required],
          validator: [''],
          range: [''],
          rangeEnd: [''],
          callForm: [''],
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
    let dialog;

    dialog = this.dialog.open(EditFieldComponent, {
      data: field as FormGroup,
      minWidth: 800
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.fakeForm.submitted) {
      return true;
    }

    if (this.form.dirty && !this.fakeForm.submitted) {
      const dialogRef = this.dialog.open(BaseDialogComponent, {
        data: this.dialogOption.exitConfirm,
        minWidth: 385,
      });
      return dialogRef.componentInstance.dialogRef.afterClosed().pipe(map(result => {
        if (result === 'true') {
          return true;
        }
      }), first());
    }
    return true;
  }

  sendForm(form: FormGroup, formType: string, sendType: string, id?: number) {
    console.log(id);

    this.formHandler.sendForm(form, formType, sendType, this.appComponent, id);

  }

}
