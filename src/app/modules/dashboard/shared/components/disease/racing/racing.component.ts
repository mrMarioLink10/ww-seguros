import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styles: []
})
export class RacingComponent implements OnInit {

  accordionTitles = ['Cuestionario'];
  @Input() affected: string;

  races = [
    {
      label: 'Velocidad en circuito',
      name: 'speed',
      group: 'speed_field'
    },
    {
      label: 'Enduro en circuito',
      name: 'enduro',
      group: 'enduro_field'
    },
    {
      label: 'Moto Cross',
      name: 'motocross',
      group: 'moto_field'
    },
    {
      label: 'Carreras en cuesta',
      name: 'race',
      group: 'race_field'
    },
    {
      label: 'Rallye, raid europeo, regularidad',
      name: 'rally',
      group: 'rally_field'
    },
    {
      label: 'Raid todo terreno, maratón',
      name: 'marathon',
      group: 'marathon_field'
    },
    {
      label: 'Trial',
      name: 'trial',
      group: 'trial_field'
    },
    {
      label: 'Carrera sobre hielo',
      name: 'iceRace',
      group: 'ice_race_field'
    },
    {
      label: 'Otras (¿Cuáles?)',
      name: 'others',
      group: 'others_field'
    },
  ];

  typeOptions: FieldConfig = {

    label: '',
    options: [
      {
        value: 'PROFESIONAL',
        viewValue: 'Profesional Moto'
      },
      {
        value: 'AFICIONADO',
        viewValue: 'Aficionado'
      }
    ]
  };

  yesNo: FieldConfig = {

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


  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  step: number;
  // racing:FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addBasicControls();

    // if (this.form.get('past_months').get('speed').value == 'FALSE') {
    //   this.form.get('past_months').get('speed').setValue(false);
    // }
    // if (this.form.get('past_months').get('enduro').value == 'FALSE') {
    //   this.form.get('past_months').get('enduro').setValue(false);
    // }
    // if (this.form.get('past_months').get('motocross').value == 'FALSE') {
    //   this.form.get('past_months').get('motocross').setValue(false);
    // }
    // if (this.form.get('past_months').get('race').value == 'FALSE') {
    //   this.form.get('past_months').get('race').setValue(false);
    // }
    // if (this.form.get('past_months').get('rally').value == 'FALSE') {
    //   this.form.get('past_months').get('rally').setValue(false);
    // }
    // if (this.form.get('past_months').get('marathon').value == 'FALSE') {
    //   this.form.get('past_months').get('marathon').setValue(false);
    // }
    // if (this.form.get('past_months').get('trial').value == 'FALSE') {
    //   this.form.get('past_months').get('trial').setValue(false);
    // }
    // if (this.form.get('past_months').get('iceRace').value == 'FALSE') {
    //   this.form.get('past_months').get('iceRace').setValue(false);
    // }
    // if (this.form.get('past_months').get('others').value == 'FALSE') {
    //   this.form.get('past_months').get('others').setValue(false);
    // }

    // if (this.form.get('future_months').get('speed').value == 'FALSE') {
    //   this.form.get('future_months').get('speed').setValue(false);
    // }
    // if (this.form.get('future_months').get('enduro').value == 'FALSE') {
    //   this.form.get('future_months').get('enduro').setValue(false);
    // }
    // if (this.form.get('future_months').get('motocross').value == 'FALSE') {
    //   this.form.get('future_months').get('motocross').setValue(false);
    // }
    // if (this.form.get('future_months').get('race').value == 'FALSE') {
    //   this.form.get('future_months').get('race').setValue(false);
    // }
    // if (this.form.get('future_months').get('rally').value == 'FALSE') {
    //   this.form.get('future_months').get('rally').setValue(false);
    // }
    // if (this.form.get('future_months').get('marathon').value == 'FALSE') {
    //   this.form.get('future_months').get('marathon').setValue(false);
    // }
    // if (this.form.get('future_months').get('trial').value == 'FALSE') {
    //   this.form.get('future_months').get('trial').setValue(false);
    // }
    // if (this.form.get('future_months').get('iceRace').value == 'FALSE') {
    //   this.form.get('future_months').get('iceRace').setValue(false);
    // }
    // if (this.form.get('future_months').get('others').value == 'FALSE') {
    //   this.form.get('future_months').get('others').setValue(false);
    // }
    // this.racing= this.fb.group({

    //   last_names:['', Validators.required],
    //   name:['', Validators.required],
    //   date:[new Date(), Validators.required],
    //   competition_date:[new Date(), Validators.required],
    //   formation:['', Validators.required],
    //   past_months: this.fb.group({

    //     speed:[false],
    //     enduro:[false],
    //     motocross:[false],
    //     race:[false],
    //     rally:[false],
    //     marathon:[false],
    //     trial:[false],
    //     ice_race:[false],
    //     others:[false],

    //   }),

    //   future_months: this.fb.group({

    //     brand:['', Validators.required],
    //     engine:['', Validators.required],
    //     type_radio:['', Validators.required],

    //     speed:[false],
    //     enduro:[false],
    //     motocross:[false],
    //     race:[false],
    //     rally:[false],
    //     marathon:[false],
    //     trial:[false],
    //     ice_race:[false],
    //     others:[false],

    //   }),

    //   accidents: this.fb.group({

    //     radio:['', Validators.required],

    //   }),

    //   info: ['', Validators.required]

    // })

    // console.log(JSON.stringify(this.form.value));

  }

  selectChangeP(event, name) {

    const nameCB = name;

    const formP = this.form.get('past_months') as FormGroup;

    console.log(event);
    console.log(nameCB);

    if (event.checked === true) {

      switch (nameCB) {

        case 'speed':

          formP.addControl('speed_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Velocidad en circuito, en checked igual a true, de past_months');

          break;

        case 'enduro':

          formP.addControl('enduro_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Enduro en circuito, en checked igual a true, de past_months');

          break;

        case 'motocross':

          formP.addControl('moto_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Motocross, en checked igual a true, de past_months');

          break;

        case 'race':

          formP.addControl('race_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Carreras en cuesta, en checked igual a true, de past_months');

          break;

        case 'rally':

          formP.addControl('rally_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Rallye, raid europeo, regularidad en checked igual a true, de past_months');

          break;

        case 'marathon':

          formP.addControl('marathon_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Raid todo terreno, maratón en checked igual a true, de past_months');

          break;

        case 'trial':

          formP.addControl('trial_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Trial en checked igual a true, de past_months');

          break;

        case 'iceRace':

          formP.addControl('ice_race_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Carrera sobre hielo en checked igual a true, de past_months');

          break;

        case 'others':

          formP.addControl('others_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Otras (¿Cuáles?) en checked igual a true, de past_months');

          break;

      }
    } else if (event.checked === false) {

      switch (nameCB) {

        case 'speed':

          formP.removeControl('speed_field');
          console.log('Esto es el switch de Velocidad en circuito, en checked igual a false, de past_months');

          break;

        case 'enduro':

          formP.removeControl('enduro_field');
          console.log('Esto es el switch de Enduro en circuito, en checked igual a false, de past_months');

          break;

        case 'motocross':

          formP.removeControl('moto_field');
          console.log('Esto es el switch de Motocross, en checked igual a false, de past_months');

          break;

        case 'race':

          formP.removeControl('race_field');
          console.log('Esto es el switch de Carreras en cuesta, en checked igual a false, de past_months');

          break;


        case 'rally':

          formP.removeControl('rally_field');
          console.log('Esto es el switch de Rallye, raid europeo, regularidad en checked igual a false, de past_months');

          break;

        case 'marathon':

          formP.removeControl('marathon_field');
          console.log('Esto es el switch de Raid todo terreno, maratón en checked igual a false, de past_months');

          break;

        case 'trial':

          formP.removeControl('trial_field');
          console.log('Esto es el switch de Trial en checked igual a false, de past_months');

          break;

        case 'iceRace':

          formP.removeControl('ice_race_field');
          console.log('Esto es el switch de Carrera sobre hielo en checked igual a false, de past_months');

          break;

        case 'others':

          formP.removeControl('others_field');
          console.log('Esto es el switch de Otras (¿Cuáles?) en checked igual a false, de past_months');

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
  selectChangeF(event, name) {

    const nameCB = name;

    const formP = this.form.get('future_months') as FormGroup;

    console.log(event);
    console.log(nameCB);

    if (event.checked === true) {

      switch (nameCB) {

        case 'speed':

          formP.addControl('speed_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Velocidad en circuito, en checked igual a true, future_months');

          break;

        case 'enduro':

          formP.addControl('enduro_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Enduro en circuito, en checked igual a true, future_months');

          break;

        case 'motocross':

          formP.addControl('moto_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Motocross, en checked igual a true, future_months');

          break;

        case 'race':

          formP.addControl('race_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Carreras en cuesta, en checked igual a true, future_months');

          break;

        case 'rally':

          formP.addControl('rally_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Rallye, raid europeo, regularidad en checked igual a true, future_months');

          break;

        case 'marathon':

          formP.addControl('marathon_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Raid todo terreno, maratón en checked igual a true, future_months');

          break;

        case 'trial':

          formP.addControl('trial_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Trial en checked igual a true, future_months');

          break;

        case 'iceRace':

          formP.addControl('ice_race_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Carrera sobre hielo en checked igual a true, future_months');

          break;

        case 'others':

          formP.addControl('others_field', this.fb.group({

            number: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required]

          }));
          console.log('Esto es el switch de Otras (¿Cuáles?) en checked igual a true, future_months');

          break;

      }
    } else if (event.checked === false) {

      switch (nameCB) {

        case 'speed':

          formP.removeControl('speed_field');
          console.log('Esto es el switch de Velocidad en circuito, en checked igual a false, de future_months');

          break;

        case 'enduro':

          formP.removeControl('enduro_field');
          console.log('Esto es el switch de Enduro en circuito, en checked igual a false, de future_months');

          break;

        case 'motocross':

          formP.removeControl('moto_field');
          console.log('Esto es el switch de Motocross, en checked igual a false, de future_months');

          break;

        case 'race':

          formP.removeControl('race_field');
          console.log('Esto es el switch de Carreras en cuesta, en checked igual a false, de future_months');

          break;


        case 'rally':

          formP.removeControl('rally_field');
          console.log('Esto es el switch de Rallye, raid europeo, regularidad en checked igual a false, de future_months');

          break;

        case 'marathon':

          formP.removeControl('marathon_field');
          console.log('Esto es el switch de Raid todo terreno, maratón en checked igual a false, de future_months');

          break;

        case 'trial':

          formP.removeControl('trial_field');
          console.log('Esto es el switch de Trial en checked igual a false, de future_months');

          break;

        case 'iceRace':

          formP.removeControl('ice_race_field');
          console.log('Esto es el switch de Carrera sobre hielo en checked igual a false, de future_months');

          break;

        case 'others':

          formP.removeControl('others_field');
          console.log('Esto es el switch de Otras (¿Cuáles?) en checked igual a false, de future_months');

          break;

      }
    }
  }

  selectRadio(event) {

    const formA = this.form.get('accidents') as FormGroup;

    if (event.valor === 'SI') {

      formA.addControl('outcome', this.fb.group({

        date: ['', Validators.required],
        consequences: ['', Validators.required],
        status: ['', Validators.required]

      }));

      console.log(JSON.stringify(this.form.value));
    } else if (event.valor === 'NO') {

      formA.removeControl('outcome');
    }

  }

  addBasicControls() {

    // this.form.addControl('last_names', this.fb.control('', Validators.required));
    // this.form.addControl('name', this.fb.control('', Validators.required));
    // this.form.addControl('date', this.fb.control(new Date(), Validators.required));
    this.form.addControl('competition_date', this.fb.control('', Validators.required));
    this.form.addControl('formation', this.fb.control('', Validators.required));
    this.form.addControl('past_months', this.fb.group({

      speed: [false],
      enduro: [false],
      motocross: [false],
      race: [false],
      rally: [false],
      marathon: [false],
      trial: [false],
      iceRace: [false],
      others: [false],

    }));
    this.form.addControl('future_months', this.fb.group({

      brand: ['', Validators.required],
      engine: ['', Validators.required],
      type_radio: ['', Validators.required],

      speed: [false],
      enduro: [false],
      motocross: [false],
      race: [false],
      rally: [false],
      marathon: [false],
      trial: [false],
      iceRace: [false],
      others: [false],

    }));
    this.form.addControl('accidents', this.fb.group({

      radio: ['', Validators.required],

    }));
    this.form.addControl('info', this.fb.control('', Validators.required));

    if (this.form.get('date')) {
      this.form.get('date').clearValidators();
      this.form.get('date').updateValueAndValidity();
    }

    if (this.form.get('last_names')) {
      this.form.get('last_names').clearValidators();
      this.form.get('last_names').updateValueAndValidity();
    }

    if (this.form.get('past_months').get('brand')) {
      this.form.get('past_months').get('brand').clearValidators();
      this.form.get('past_months').get('brand').updateValueAndValidity();
    }

    if (this.form.get('past_months').get('engine')) {
      this.form.get('past_months').get('engine').clearValidators();
      this.form.get('past_months').get('engine').updateValueAndValidity();
    }

    if (this.form.get('past_months').get('type_radio')) {
      this.form.get('past_months').get('type_radio').clearValidators();
      this.form.get('past_months').get('type_radio').updateValueAndValidity();
    }
  }

}
