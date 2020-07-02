import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataFillingService {


  constructor(
    private fb: FormBuilder

  ) { }

  has(object: any, key: any) {
    return object ? this.hasOwnProperty.call(object, key) : false;
  }
  iterateThroughtAllObject(obj: any, groupControl: any) {
    const formDataGroup = groupControl as FormGroup;
    Object.keys(obj).forEach(e => {
      const key = e;
      const value = obj[key];
      if (value !== undefined && (typeof value) !== 'object') {

        const valueToSet = (value === null || value === undefined) ? "" : value;

        if (valueToSet !== undefined ) {
          if (!this.has(formDataGroup.controls, key)) {
            formDataGroup.addControl(key, this.fb.control(valueToSet));
          } else {

            const valueFormControl = formDataGroup.controls[key] as FormControl;
            valueFormControl.setValue(valueToSet);
          }
        }
      }
      else if (value !== null && value !== undefined && (typeof value) === 'object') {
        if (Array.isArray(value)) {
          if (this.has(formDataGroup.controls, key)) {
            formDataGroup.removeControl(key);
          }
          if (value.length > 0) {

            const arrayForm = [];
            value.forEach((element) => {
              const fbGroup = this.fb.group({
                id: ['', Validators.required]
              });

              this.iterateThroughtAllObject(element, fbGroup);
              arrayForm.push(fbGroup);
            });
            formDataGroup.addControl(key, this.fb.array(arrayForm));
          }
          else
          {
            formDataGroup.addControl(key, this.fb.array([]));
          }
        }
        else
        {
          if (key !== "anonimousUser")
          {
          if (!this.has(formDataGroup.controls, key)) {
            formDataGroup.addControl(key, this.fb.group({
              id: ['', Validators.required]
            }));
          }
          const form = formDataGroup.get(key);
          this.iterateThroughtAllObject(value, form);

          if ((key.includes("solucionAnti")  || key.includes("solicitud") || key.includes("knowYour")  || key.includes("columnaVertebralColumnaVertebral")) && form.get("id").value == "0")
          {
            console.log("DELETE DATAAAAA");
            formDataGroup.removeControl(key);
          }
        }
        }
      }

    });
  }
}
