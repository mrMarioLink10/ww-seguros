import { Injectable } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor() { }

  yesOrNoOriginal: FieldConfig = {
    label: '',
    options: [
      {
        value: 'si',
        viewValue: 'Si'
      },
      {
        value: 'no',
        viewValue: 'No'
      }
    ]
  };

  accordionTitle = ['Datos'];

  removeToList(index, list: any) {
    list.removeAt(index);
  }
}
