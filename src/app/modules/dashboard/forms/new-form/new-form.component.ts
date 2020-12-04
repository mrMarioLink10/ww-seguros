import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { EditFieldComponent } from '../components/edit-field/edit-field.component';
import { DialogOptionService } from '../../../../core/services/dialog/dialog-option.service';
import { FormHandlerService } from '../../../../core/services/forms/form-handler.service';
import { AppComponent } from '../../../../app.component';
import { FormsService } from '../../services/forms/forms.service';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {

  form: FormGroup;
  showContent = true;
  ID = null;

  @ViewChild('fakeForm', { static: false }) fakeForm;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogOption: DialogOptionService,
    public formHandler: FormHandlerService,
    private appComponent: AppComponent,
    private formsService: FormsService,
    private dataMappingFromApi: FormDataFillingService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe(res => {
      this.ID = res.id;
    });

    if (this.ID != null) {
      console.log('El ID es ' + this.ID);
      this.getData(this.ID);
    } else if (this.ID == null) {
      console.log('ID esta vacio');
    }

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
          nombre: ['', Validators.required],
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
          haveRange: [''],
          range: [0],
          rangeEnd: [0],
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
    this.formHandler.sendForm(form, formType, sendType, this.appComponent, id);
  }

  getData(id: number) {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });

    this.formsService.getTargetData(id).subscribe(data => {
      this.dataMappingFromApi.iterateThroughtAllObject(data.data, this.form);

      setTimeout(() => {
        this.appComponent.showOverlay = false;
      });

      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      this.cd.markForCheck();
    });
  }
}
