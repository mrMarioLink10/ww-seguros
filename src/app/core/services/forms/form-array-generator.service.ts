import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

interface Elements{
  formArray: FormArray;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormArrayGeneratorService {

  constructor() { }

    // Primer paso
  createItem(FormGroupChild): FormGroup {
    return FormGroupChild;
  }

  // Obtener el formArray para agregar los nuevos formularios


  addElement(FormControlArray: FormArray, incrementValue: number, FormGroupChild: FormGroup): Elements {
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
  /**
   * incrementValue: number / El valor que indica las cantidades de elementos a mostrar
   * FormGroupChild: FormGroup / El formGroup que debe tener cada elemento del array
   * formArray: FormArray / Es el control dentro del form group principal que contiene el formArray
   * retorna un formArray
   */
  onChangeForms(incrementValue: number, FormGroupChild: FormGroup, formArray: FormArray ): FormArray{

      if (formArray.length < incrementValue) {
          formArray =  this.addElement(formArray, incrementValue, FormGroupChild).formArray;

      } else if (formArray.length > incrementValue) {
          formArray =  this.deleteElements(formArray, incrementValue).formArray;
      }

      return formArray;
  }
}
