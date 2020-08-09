import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-mountaineering',
  templateUrl: './mountaineering.component.html',
  styles: []
})
export class MountaineeringComponent implements OnInit, DoCheck {

  accordionTitles = ['Cuestionario'];

  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  @Input() affected: string;

  step: number;
  // mountaineering:FormGroup;
  c = 0;
  dataText;
  YesNo: FieldConfig = {
    label: '',
    options: [
      {
        value: 'SI',
        viewValue: 'Si'
      },
      {
        value: 'NO',
        viewValue: 'No'
      }
    ]
  };

  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService) { }

  ngOnInit() {

    this.addBasicControls();
    // this.mountaineering= this.fb.group({

    //   name:['', Validators.required],
    //   activities: this.fb.group({

    //     artificial_wall_radio:['', Validators.required],
    //     expeditions_radio:['', Validators.required],
    //     climbing_radio:['', Validators.required],
    //     Hiking_radio:['', Validators.required],
    //     ice_climbing_radio:['', Validators.required],
    //     rock_climbing_radio:['', Validators.required],

    //   }),
    //   club: this.fb.group({

    //     organization_radio:['', Validators.required]

    //   }),
    //   max_height: this.fb.group({

    //     height:['', Validators.required]

    //   }),
    //   climb: this.fb.group({

    //     radio:['', Validators.required]

    //   }),
    //   climb_zone: this.fb.group({

    //     africa:['', Validators.required],
    //     alpes:['', Validators.required],
    //     himalaya:['', Validators.required],
    //     andes:['', Validators.required],
    //     McKinley:['', Validators.required],
    //     Alaska:['', Validators.required],
    //     mountain_range:['', Validators.required],
    //     others:['', Validators.required]
    //   }),
    //   expeditions: this.fb.group({

    //     radio:['', Validators.required],

    //   }),

    //   category: this.fb.group({

    //     type_radio:['', Validators.required]

    //   })


    // })

  }

  ngDoCheck() {

    const formZ = this.form.get('climb_zone') as FormGroup;
    // // console.log(this.dataText);
    // if (this.c === 0 && (this.form.get('climb_zone').get('africa').value === 'SI'
    //   || this.form.get('climb_zone').get('alpes').value === 'SI'
    //   || this.form.get('climb_zone').get('himalaya').value === 'SI'
    //   || this.form.get('climb_zone').get('andes').value === 'SI'
    //   || this.form.get('climb_zone').get('mcKinley').value === 'SI'
    //   || this.form.get('climb_zone').get('alaska').value === 'SI'
    //   || this.form.get('climb_zone').get('mountain_range').value === 'SI'
    //   || this.form.get('climb_zone').get('others').value === 'SI')) {

    //   if (!this.form.get('climb_zone').get('area_text')) {
    //     formZ.addControl('area_text', this.fb.group({
    //       info: [this.dataText, Validators.required]
    //     }));
    //     // this.form.get('climb_zone').get('area_text').get('info').setValue(this.dataText);
    //     this.c = 1;
    //     console.log('El campo ha sido restaurado. El valor de c ahora es ' + this.c);
    //   }
    // }
    if ((formZ.get('africa').value === 'NO' || formZ.get('africa').value === '' ||
      formZ.get('africa').value === null || formZ.get('africa').value === undefined)
      && (formZ.get('alpes').value === 'NO' || formZ.get('alpes').value === '' ||
        formZ.get('alpes').value === null || formZ.get('alpes').value === undefined)
      && (formZ.get('himalaya').value === 'NO' || formZ.get('himalaya').value === '' ||
        formZ.get('himalaya').value === null || formZ.get('himalaya').value === undefined)
      && (formZ.get('andes').value === 'NO' || formZ.get('andes').value === '' ||
        formZ.get('andes').value === null || formZ.get('andes').value === undefined)
      && (formZ.get('mcKinley').value === 'NO' || formZ.get('mcKinley').value === '' ||
        formZ.get('mcKinley').value === null || formZ.get('mcKinley').value === undefined)
      && (formZ.get('alaska').value === 'NO' || formZ.get('alaska').value === '' ||
        formZ.get('alaska').value === null || formZ.get('alaska').value === undefined)
      && (formZ.get('mountain_range').value === 'NO' || formZ.get('mountain_range').value === '' ||
        formZ.get('mountain_range').value === null || formZ.get('mountain_range').value === undefined)
      && (formZ.get('others').value === 'NO' || formZ.get('others').value === '' ||
        formZ.get('others').value === null || formZ.get('others').value === undefined)) {
      formZ.removeControl('area_text');
    }
    else {
      console.log('No se puede eliminar aún.');
    }
  }

  addBasicControls() {

    // this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('activities', this.fb.group({

      artificial_wall_radio: ['', Validators.required],
      expeditions_radio: ['', Validators.required],
      climbing_radio: ['', Validators.required],
      hiking_radio: ['', Validators.required],
      ice_climbing_radio: ['', Validators.required],
      rock_climbing_radio: ['', Validators.required],

    }));

    this.form.addControl('club', this.fb.group({

      organization_radio: ['', Validators.required]

    }));

    this.form.addControl('max_height', this.fb.group({

      height: ['', Validators.required]

    }));

    this.form.addControl('climb', this.fb.group({

      radio: ['', Validators.required]

    }));

    this.form.addControl('climb_zone', this.fb.group({

      africa: ['', Validators.required],
      alpes: ['', Validators.required],
      himalaya: ['', Validators.required],
      andes: ['', Validators.required],
      mcKinley: ['', Validators.required],
      alaska: ['', Validators.required],
      mountain_range: ['', Validators.required],
      others: ['', Validators.required]

    }));

    this.form.addControl('expeditions', this.fb.group({

      radio: ['', Validators.required],

    }));

    this.form.addControl('category', this.fb.group({

      type_radio: ['', Validators.required]

    }));
  }

  selectChange(event) {
    const form = this.form.get('club') as FormGroup;
    const formZ = this.form.get('climb_zone') as FormGroup;
    const formE = this.form.get('expeditions') as FormGroup;
    const formG = this.form.get('expeditions').get('cave') as FormGroup;
    const formS = this.form.get('category') as FormGroup;

    if (event.valor === 'SI') {

      switch (event.name) {

        case 'organization_radio':

          form.addControl('area_text', this.fb.group({
            info: ['', Validators.required]
          }));
          console.log(JSON.stringify(this.form.value));

          break;

        case 'africa':
        case 'alpes':
        case 'himalaya':
        case 'andes':
        case 'mcKinley':
        case 'alaska':
        case 'mountain_range':
        case 'others':

          // if (this.c >= 8) {
          //   console.log('No se se hara nada porque el valor de c es ' + this.c);
          // } else if (this.c === 0) {
          //   this.c++;
          //   console.log('El valor de c es ' + this.c);
          //   formZ.addControl('area_text', this.fb.group({
          //     info: ['', Validators.required]
          //   }));
          //   console.log(JSON.stringify(this.form.value));

          // } else if (this.c > 0) {
          //   this.c++;
          //   console.log('Este campo ya existe. El nuevo valor de c ahora es ' + this.c);
          // }
          if (!formZ.get('area_text')) {
            formZ.addControl('area_text', this.fb.group({
              info: ['', Validators.required]
            }));
          }
          else {
            console.log('Este campo ya existe');
          }
          break;

        case 'radio':

          formE.addControl('cave', this.fb.group({
            date: [new Date(), Validators.required],
            quantity: ['', [Validators.required, Validators.min(0)]],
            grotto_radio: ['', Validators.required],
            dive_radio: ['', Validators.required]
          }));
          console.log(JSON.stringify(this.form.value));

          break;

        case 'grotto_radio':

          formG.addControl('grotto', this.fb.group({
            info: ['', Validators.required]
          }));
          console.log(JSON.stringify(this.form.value));

          break;

        case 'dive_radio':

          formG.addControl('underwater', this.fb.group({
            info: ['', Validators.required]
          }));
          console.log(JSON.stringify(this.form.value));

          break;

        case 'type_radio':

          formS.addControl('sport', this.fb.group({
            info: ['', Validators.required]
          }));
          console.log(JSON.stringify(this.form.value));

          break;
      }
    }

    // tslint:disable-next-line: one-line
    else if (event.valor === 'NO') {

      switch (event.name) {

        case 'organization_radio':

          form.removeControl('area_text');

          break;

        //   case 'africa':
        //   case 'alpes':
        //   case 'himalaya':
        //   case 'andes':
        //   case 'mcKinley':
        //   case 'alaska':
        //   case 'mountain_range':
        //   case 'others':
        // if (this.c === 0) {
        //   console.log('No se se hara nada porque el valor de c es ' + this.c);
        // } else if (this.c === 1) {
        //   this.c--;
        //   this.dataText = this.form.get('climb_zone').get('area_text').get('info').value;
        //   console.log('El campo ha sido eliminado. El valor de c ahora es ' + this.c);
        //   formZ.removeControl('area_text');

        // } else if (this.c > 1) {
        //   this.c--;
        //   console.log('No se puede eliminar aún. El nuevo valor de c es ' + this.c);
        // }
        // break;

        case 'radio':

          formE.removeControl('cave');

          break;

        case 'grotto_radio':

          formG.removeControl('grotto');

          break;

        case 'dive_radio':

          formG.removeControl('underwater');

          break;

        case 'type_radio':

          formS.removeControl('sport');

          break;
      }

    }
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }
}
