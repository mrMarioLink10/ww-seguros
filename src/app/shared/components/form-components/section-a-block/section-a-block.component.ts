import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from '../models/field-config';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DiseaseService } from 'src/app/modules/dashboard/shared/components/disease/shared/disease/disease.service';
import { $time } from 'src/app/core/form/objects';

@Component({
  selector: 'app-section-a-block',
  templateUrl: './section-a-block.component.html',
  styleUrls: ['./section-a-block.component.scss']
})
export class SectionABlockComponent implements OnInit {
  @Input() newRequest: FormGroup;

  @Input() questionName: string;
  @Input() inFormName: string;

  @Input() arrayList: FormArray;
  @Input() arrayName: string;

  @Input() dependentsArrayList: FormArray;

  @Input() haveAilmentOptions: string;
  @Input() ailmentOptions: FieldConfig;

  @Input() questionnairesGastosMayores: any;

  @Output() ailmentSelected = new EventEmitter<any>();
  @Output() addToList = new EventEmitter<any>();

  todayDate = new Date();

  year = {
    label: 'Seleccione',
    options: $time,
    name: 'time'
  };

  constructor(
    public diseaseService: DiseaseService
  ) { }

  ngOnInit() {
  }

  ailmentSelectedInBlock(type, form, watcherForm) {
    this.ailmentSelected.emit({ type, form, watcherForm });
  }

  addToListInBlock(array, name) {
    this.addToList.emit({ array, name });
  }

  haveToShowWhichFormComponent(inFormName: string) {
    if (inFormName === 'havePhysiologicalDisorder' || inFormName === 'haveBloodTransfusion') {
      return false;
    } else {
      return true;
    }
  }

}
