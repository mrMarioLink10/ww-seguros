import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormBuilder } from '@angular/forms';

interface Elements{
  formArray: FormArray;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormArrayGeneratorService {

  constructor(private fb: FormBuilder) { }

    // Primer paso
  createItem(FormGroupChild): FormGroup {
    return  this.fb.group(FormGroupChild);
  }

  // Obtener el formArray para agregar los nuevos formularios


  addElement(FormControlArray: FormArray, incrementValue: number, FormGroupChild: any): Elements {

      for (let i = FormControlArray.length; i < incrementValue; i++) {
          FormControlArray.push(this.createItem(FormGroupChild));
      }

      return { formArray: FormControlArray, length: FormControlArray.length};
  }

  deleteElements(FormControlArray: FormArray, incrementValue: number): Elements {
      for (let i = FormControlArray.length; i >= incrementValue; i--) {
          FormControlArray.removeAt(i);
      }

      return { formArray: FormControlArray, length: FormControlArray.length};
  }
  deleteOneElement(FormControlArray: FormArray, id: number): Elements {
    FormControlArray.removeAt(id);
    return { formArray: FormControlArray, length: FormControlArray.length};
  }

  onChangeForms(incrementValue: number, FormGroupChild: any, formArray: FormArray ): FormArray {

      if (formArray.length < incrementValue) {
          formArray =  this.addElement(formArray, incrementValue, FormGroupChild).formArray;

      } else if (formArray.length > incrementValue) {
          formArray =  this.deleteElements(formArray, incrementValue).formArray;
      }
      return formArray;
  }
}
